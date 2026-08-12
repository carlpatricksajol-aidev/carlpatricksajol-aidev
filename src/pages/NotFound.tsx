import { Link } from "react-router-dom";
import { Page } from "@/components/SiteChrome";
import { ArrowRight } from "@/components/primitives";

const links = [
  { to: "/", label: "Home", note: "The problem, the method, the work, and how to get in touch" },
  { to: "/work", label: "Work", note: "Every system, in one list" },
  { to: "/experience", label: "Experience", note: "Roles, stack and background" },
];

const NotFound = () => (
  <Page>
    <div className="w-shell gutter section">
      <div className="w-text">
        <p className="t-slug text-brand-600">404</p>
        <h1 className="t-display mt-s4 max-w-[18ch]">That page doesn't exist</h1>
        <p className="t-lead mt-s5 max-w-[46ch] text-ink-secondary">
          The link may be out of date. Everything on the site is one of these three places.
        </p>
      </div>
      <ul className="mt-s8 border-t border-line">
        {links.map((l) => (
          <li key={l.to} className="border-b border-line">
            <Link
              to={l.to}
              className="group grid grid-cols-[1fr_auto] items-center gap-s4 py-s5 transition-colors duration-120 hover:bg-surface-sunken"
            >
              <span>
                <span className="t-sub block text-ink">{l.label}</span>
                <span className="t-body mt-1 block text-ink-secondary">{l.note}</span>
              </span>
              <span className="text-brand-600 transition-transform duration-[160ms] group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Page>
);

export default NotFound;
