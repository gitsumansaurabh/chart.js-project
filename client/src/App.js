import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Intensity from "./components/Intensity";
import Region from "./components/Region";
// const Intensity = React.lazy(() => import("./components/Intensity"));
// const Region = React.lazy(() => import("./components/Region"));
const Relevance = React.lazy(() => import("./components/Relevance"));
const Likelihood = React.lazy(() => import("./components/Likelihood"));
const Year = React.lazy(() => import("./components/Year"));
const Topic = React.lazy(() => import("./components/Topic"));
const Country = React.lazy(() => import("./components/Country"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar></Navbar>
        <List>
          <Intensity></Intensity>
          <Region></Region>

          <Suspense fallback={<p>...</p>}>
            <div className="grid lg:grid-cols-2 place-items-center">
              <Relevance className="lg:grid-cols-1 "></Relevance>
              <Likelihood className="lg:grid-cols-1 "></Likelihood>
            </div>

            <Topic></Topic>
            <Year></Year>
            <Country></Country>
          </Suspense>
        </List>
      </>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
