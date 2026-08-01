import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyDetail } from "@/components/sections/CompanyDetail";
import { Footer } from "@/components/sections/Footer";
import { COMPANIES, getCompanyBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COMPANIES.map((company) => ({ slug: company.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return {};

  return {
    title: company.name,
    description: company.description,
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  return (
    <>
      <CompanyDetail company={company} />
      <Footer />
    </>
  );
}
