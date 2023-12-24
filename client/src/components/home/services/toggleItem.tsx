'use client'
import { useState } from "react";

const style = {
    ol_li: "font-bold",
}

const ToggleItem = ({ title, children }: {
    title: string,
    children: React.ReactNode
}) => {
    const [toggleThisElement, setToggleThisElement] = useState(false);
    return (
        <li className={style.ol_li} key={title}>
            <button onClick={() => setToggleThisElement((prev) => !prev)}>
                {title}
            </button>

            {toggleThisElement && <div>{children}</div>}
        </li>
    );
};

export default ToggleItem;