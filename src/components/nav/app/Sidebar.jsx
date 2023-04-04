import { Link } from "react-router-dom";
import { navList } from "../../../data/sidebarList";

const Sidebar = () => {
    return (
        <aside className="appCustomSidebar">
            <div className="iconBar">
                <h3>
                    Space<span> Bank</span>
                </h3>
            </div>

            <div className="navListBody">
                <h4>Navigation</h4>

                <ul>
                    {navList.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={`${item.link}`}>
                                    {item.icon} <i>{item.title}</i>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* <div className="navListBody">
                <h4>Balances</h4>

                <ul className="balanceList">
                {
                    balanceList.map((item, index) => {
                        return (
                        <li key={index}>
                            <Link to={`${item.link}`}>{item.icon} {item.title}</Link>
                        </li>
                        )
                    })
                }
                </ul>
            </div> */}
        </aside>
    );
};

export default Sidebar;
