import type { Metadata } from "next";
import NavLink from "../ui/nav-link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function PageRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <nav>
        <NavLink />
      </nav>
      <section className="rounded bg-skin-content-fill">{children}</section>
    </div>
  );
}