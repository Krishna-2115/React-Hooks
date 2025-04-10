import { useState, useTransition } from "react";

export default function AnimatedRoutes() {
  const routes = ["Dashboard", "Settings", "Profile"];
  const [route, setRoute] = useState("Dashboard");
  const [isPending, startTransition] = useTransition();

  const changeRoute = (r) => {
    startTransition(() => setRoute(r));
  };

  return (
    <div className="p-4">
      <div className="flex gap-2">
        {routes.map(r => (
          <button
            key={r}
            className="btn"
            onClick={() => changeRoute(r)}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="transition-opacity duration-500 mt-4">
        {isPending ? <p>Switching...</p> : <p>{route} View</p>}
      </div>
    </div>
  );
}
