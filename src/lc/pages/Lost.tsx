import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Split } from "../motion";
import { useTitle } from "../util";

const Lost = () => {
  useTitle("Not found · Carl Patrick Sajol");
  return (
    <header className="wrap page-head" style={{ minHeight: "70vh" }}>
      <span className="eyebrow">404</span>
      <h1 className="title"><Split text="This page *moved on.*" immediate delay={0.1} /></h1>
      <p className="lede">It does not exist, or it changed when the site was rebuilt.</p>
      <div style={{ marginTop: 34 }}>
        <Link className="btn gold" to="/work"><span>See the work</span><ArrowRight /></Link>
      </div>
    </header>
  );
};

export default Lost;
