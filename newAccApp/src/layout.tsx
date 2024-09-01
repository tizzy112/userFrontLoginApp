import { ReactNode } from "react";
import { UserfrontProvider } from "@userfront/react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <UserfrontProvider tenantId="xbpdq47b">{children}</UserfrontProvider>
      </body>
    </html>
  );
}
