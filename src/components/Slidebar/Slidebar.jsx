import { useContext } from "react";
import { UIContext } from "../../context/UIContext";

export default function Sidebar() {
  const { activeAccordion, setActiveAccordion } = useContext(UIContext);

  const toggle = (id) =>
    setActiveAccordion(activeAccordion === id ? null : id);

  return (
    <aside className="sidebar active">
      <div className="sidebar-category">

        <div className="sidebar-top">
          <h2 className="sidebar-title">Category</h2>
        </div>

        <ul className="sidebar-menu-category-list">

          <li className="sidebar-menu-category">
            <button
              className={`sidebar-accordion-menu ${
                activeAccordion === "clothes" ? "active" : ""
              }`}
              onClick={() => toggle("clothes")}
            >
              <p className="menu-title">Clothes</p>
              <span>+</span>
            </button>

            <ul
              className={`sidebar-submenu-category-list ${
                activeAccordion === "clothes" ? "active" : ""
              }`}
            >
              <li className="sidebar-submenu-category">
                <a className="sidebar-submenu-title" href="#">
                  Shirt <data className="stock">300</data>
                </a>
              </li>
              <li className="sidebar-submenu-category">
                <a className="sidebar-submenu-title" href="#">
                  Jacket <data className="stock">50</data>
                </a>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </aside>
  );
}
