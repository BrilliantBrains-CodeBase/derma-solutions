import { treatmentPage } from '@/config/site'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'

/**
 * The treatment pages' page-header band — see PageHeader for the measurements
 * and the reference it is built to.
 *
 * One departure of its own: "Services" is plain text. The reference links it to
 * a services index, and this site has none — a link would 404.
 */
export function TreatmentPageHeader({ h1, name }: { h1: string; name: string }) {
  return (
    <PageHeader h1={h1}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: treatmentPage.breadcrumbSection }, { label: name }]} />
    </PageHeader>
  )
}
