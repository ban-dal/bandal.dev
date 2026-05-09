import { GitHubIcon } from "@/components/GitHubIcon";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/NavLink";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md border-b py-3 transition-all duration-300 shadow-sm">
      <div className="flex justify-between items-center content-container">
        <Logo />
        <ul className="flex items-center">
          <li className="hidden md:block">
            <NavLink href="/blog">블로그</NavLink>
          </li>
          <li className="hidden md:block">
            <NavLink href="/notes">노트</NavLink>
          </li>
          <li className="hidden md:block">
            <NavLink href="/about">소개</NavLink>
          </li>
          <li>
            <NavLink
              href="https://github.com/ban-dal"
              isExternal
              icon={<GitHubIcon />}
            >
              GitHub
            </NavLink>
          </li>
        </ul>
        <ThemeSwitch />
      </div>
    </nav>
  );
}
