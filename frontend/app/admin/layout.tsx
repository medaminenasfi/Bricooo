import { AdminShell } from "@/components/admin/admin-shell"

export const metadata = {
  title: "Admin — HelloBrico",
  description: "Tableau de bord administration HelloBrico",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShell>{children}</AdminShell>
}
