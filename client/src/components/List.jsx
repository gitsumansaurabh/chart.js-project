import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { fetchDataByFilterAsync } from "./dataSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const filters = [
  {
    id: "end_year",
    name: "END YEAR",
    options: [
      { value: 2017, label: 2017, checked: false },
      { value: 2018, label: 2018, checked: false },
      { value: 2019, label: 2019, checked: false },
      { value: 2020, label: 2020, checked: false },
      { value: 2021, label: 2021, checked: false },
      { value: 2022, label: 2022, checked: false },
      { value: 2024, label: 2024, checked: false },
      { value: 2025, label: 2025, checked: false },
      { value: 2026, label: 2026, checked: false },
      { value: 2027, label: 2027, checked: false },
      { value: 2028, label: 2028, checked: false },
      { value: 2030, label: 2030, checked: false },
      { value: 2034, label: 2034, checked: false },
      { value: 2035, label: 2035, checked: false },
      { value: 2036, label: 2036, checked: false },
      { value: 2040, label: 2040, checked: false },
      { value: 2041, label: 2041, checked: false },
      { value: 2046, label: 2046, checked: false },
      { value: 2050, label: 2050, checked: false },
      { value: 2051, label: 2051, checked: false },
      { value: 2055, label: 2055, checked: false },
      { value: 2060, label: 2060, checked: false },
      { value: 2126, label: 2126, checked: false },
      { value: 2200, label: 2200, checked: false },
    ],
  },
  {
    id: "sector",
    name: "SECTOR",
    options: [
      { value: "Energy", label: "Energy", checked: false },
      { value: "Environment", label: "Environment", checked: false },

      { value: "Government", label: "Government", checked: false },
      {
        value: "Aerospace & defence",
        label: "Aerospace & defence",
        checked: false,
      },
      { value: "Manufacturing", label: "Manufacturing", checked: false },
      { value: "Retail", label: "Retail", checked: false },
      {
        value: "Financial services",
        label: "Financial services",
        checked: false,
      },
      {
        value: "Support services",
        label: "Support services",
        checked: false,
      },
      {
        value: "Information Technology",
        label: "Information Technology",
        checked: false,
      },
      { value: "Healthcare", label: "Healthcare", checked: false },
      {
        value: "Food & agriculture",
        label: "Food & agriculture",
        checked: false,
      },
      { value: "Automotive", label: "Automotive", checked: false },
      {
        value: "Tourism & hospitality",
        label: "Tourism & hospitality",
        checked: false,
      },
      { value: "Construction", label: "Construction", checked: false },
      { value: "Security", label: "Security", checked: false },
      { value: "Transport", label: "Transport", checked: false },
      { value: "Water", label: "Water", checked: false },
      {
        value: "Media & entertainment",
        label: "Media & entertainment",
        checked: false,
      },
    ],
  },
  {
    id: "region",
    name: "REGION",
    options: [
      {
        value: "Northern America",
        label: "Northern America",
        checked: false,
      },
      {
        value: "Central America",
        label: "Central America",
        checked: false,
      },
      { value: "World", label: "World", checked: false },

      { value: "Western Africa", label: "Western Africa", checked: false },
      { value: "Western Asia", label: "Western Asia", checked: false },
      { value: "Eastern Europe", label: "Eastern Europe", checked: false },
      { value: "Central Africa", label: "Central Africa", checked: false },
      {
        value: "Northern Africa",
        label: "Northern Africa",
        checked: false,
      },
      {
        value: "Southern Africa",
        label: "Southern Africa",
        checked: false,
      },
      { value: "Southern Asia", label: "Southern Asia", checked: false },
      { value: "Central Asia", label: "Central Asia", checked: false },
      { value: "Eastern Asia", label: "Eastern Asia", checked: false },
      { value: "South America", label: "South America", checked: false },
      {
        value: "South-Eastern Asia",
        label: "South-Eastern Asia",
        checked: false,
      },
      { value: "Eastern Africa", label: "Eastern Africa", checked: false },
      { value: "Europe", label: "Europe", checked: false },
      { value: "Western Europe", label: "Western Europe", checked: false },
      {
        value: "Northern Europe",
        label: "Northern Europe",
        checked: false,
      },
      {
        value: "Southern Europe",
        label: "Southern Europe",
        checked: false,
      },
      { value: "Oceania", label: "Oceania", checked: false },
      { value: "Africa", label: "Africa", checked: false },
      { value: "Asia", label: "Asia", checked: false },
      { value: "world", label: "world", checked: false },
    ],
  },
  {
    id: "country",
    name: "COUNTRY",
    options: [
      {
        value: "United States of America",
        label: "United States of America",
        checked: false,
      },
      { value: "Mexico", label: "Mexico", checked: false },

      { value: "Nigeria", label: "Nigeria", checked: false },
      { value: "Lebanon", label: "Lebanon", checked: false },
      { value: "Russia", label: "Russia", checked: false },
      { value: "Saudi Arabia", label: "Saudi Arabia", checked: false },
      { value: "Angola", label: "Angola", checked: false },
      { value: "Egypt", label: "Egypt", checked: false },
      { value: "South Africa", label: "South Africa", checked: false },
      { value: "India", label: "India", checked: false },
      { value: "Ukraine", label: "Ukraine", checked: false },
      { value: "Azerbaijan", label: "Azerbaijan", checked: false },
      { value: "China", label: "China", checked: false },
      { value: "Colombia", label: "Colombia", checked: false },
      { value: "Niger", label: "Niger", checked: false },
      { value: "Libya", label: "Libya", checked: false },
      { value: "Brazil", label: "Brazil", checked: false },
      { value: "Mali", label: "Mali", checked: false },
      { value: "Indonesia", label: "Indonesia", checked: false },
      { value: "Iraq", label: "Iraq", checked: false },
      { value: "Iran", label: "Iran", checked: false },
      { value: "South Sudan", label: "South Sudan", checked: false },
      { value: "Venezuela", label: "Venezuela", checked: false },
      { value: "Burkina Faso", label: "Burkina Faso", checked: false },
      { value: "Germany", label: "Germany", checked: false },
      { value: "United Kingdom", label: "United Kingdom", checked: false },
      { value: "Kuwait", label: "Kuwait", checked: false },
      { value: "Canada", label: "Canada", checked: false },
      { value: "Argentina", label: "Argentina", checked: false },
      { value: "Japan", label: "Japan", checked: false },
      { value: "Austria", label: "Austria", checked: false },
      { value: "Spain", label: "Spain", checked: false },
      { value: "Estonia", label: "Estonia", checked: false },
      { value: "Hungary", label: "Hungary", checked: false },
      { value: "Australia", label: "Australia", checked: false },
      { value: "Morocco", label: "Morocco", checked: false },
      { value: "Greece", label: "Greece", checked: false },
      { value: "Qatar", label: "Qatar", checked: false },
      { value: "Oman", label: "Oman", checked: false },
      { value: "Liberia", label: "Liberia", checked: false },
      { value: "Denmark", label: "Denmark", checked: false },
      { value: "Malaysia", label: "Malaysia", checked: false },
      { value: "Jordan", label: "Jordan", checked: false },
      { value: "Syria", label: "Syria", checked: false },
      { value: "Ethiopia", label: "Ethiopia", checked: false },
      { value: "Norway", label: "Norway", checked: false },
      { value: "Ghana", label: "Ghana", checked: false },
      { value: "Kazakhstan", label: "Kazakhstan", checked: false },
      { value: "Pakistan", label: "Pakistan", checked: false },
      { value: "Gabon", label: "Gabon", checked: false },
      {
        value: "United Arab Emirates",
        label: "United Arab Emirates",
        checked: false,
      },
      { value: "Algeria", label: "Algeria", checked: false },
      { value: "Turkey", label: "Turkey", checked: false },
      { value: "Cyprus", label: "Cyprus", checked: false },
      { value: "Belize", label: "Belize", checked: false },
      { value: "Poland", label: "Poland", checked: false },
    ],
  },
  {
    id: "topic",
    name: "TOPICS",
    options: [
      { value: "gas", label: "gas", checked: false },
      { value: "oil", label: "oil", checked: false },
      { value: "consumption", label: "consumption", checked: false },
      { value: "market", label: "market", checked: false },
      { value: "gdp", label: "gdp", checked: false },
      { value: "war", label: "war", checked: false },
      { value: "production", label: "production", checked: false },
      { value: "export", label: "export", checked: false },
      { value: "battery", label: "battery", checked: false },
      { value: "biofuel", label: "biofuel", checked: false },
      { value: "policy", label: "policy", checked: false },
      { value: "economy", label: "economy", checked: false },
      { value: "strategy", label: "strategy", checked: false },
      { value: "robot", label: "robot", checked: false },
      { value: "growth", label: "growth", checked: false },
      { value: "economic", label: "economic", checked: false },
      { value: "energy", label: "energy", checked: false },
      { value: "food", label: "food", checked: false },
      { value: "administration", label: "administration", checked: false },
      { value: "unemployment", label: "unemployment", checked: false },
      { value: "trade", label: "trade", checked: false },
      { value: "demand", label: "demand", checked: false },
      { value: "economic growth", label: "economic growth", checked: false },
      { value: "industry", label: "industry", checked: false },
      { value: "capital", label: "capital", checked: false },
      { value: "worker", label: "worker", checked: false },
      { value: "tension", label: "tension", checked: false },
      { value: "terrorism", label: "terrorism", checked: false },
      { value: "transport", label: "transport", checked: false },
      { value: "peak oil", label: "peak oil", checked: false },
      { value: "vehicle", label: "vehicle", checked: false },
      { value: "tourist", label: "tourist", checked: false },
      {
        value: "artificial intelligence",
        label: "artificial intelligence",
        checked: false,
      },
      { value: "climate", label: "climate", checked: false },
      { value: "power", label: "power", checked: false },
      { value: "crisis", label: "crisis", checked: false },
      { value: "ice", label: "ice", checked: false },
      { value: "population", label: "population", checked: false },
      { value: "politics", label: "politics", checked: false },
      { value: "business", label: "business", checked: false },
      { value: "work", label: "work", checked: false },
      { value: "coal", label: "coal", checked: false },
      { value: "gamification", label: "gamification", checked: false },
      { value: "finance", label: "finance", checked: false },
      { value: "interest rate", label: "interest rate", checked: false },
      { value: "risk", label: "risk", checked: false },
      { value: "inflation", label: "inflation", checked: false },
      { value: "asylum", label: "asylum", checked: false },
      { value: "resource", label: "resource", checked: false },
      { value: "plastic", label: "plastic", checked: false },
      { value: "electricity", label: "electricity", checked: false },
      { value: "bank", label: "bank", checked: false },
      { value: "gasoline", label: "gasoline", checked: false },
      { value: "car", label: "car", checked: false },
      { value: "money", label: "money", checked: false },
      { value: "technology", label: "technology", checked: false },
      { value: "aquaculture", label: "aquaculture", checked: false },
      { value: "city", label: "city", checked: false },
      { value: "investment", label: "investment", checked: false },
      { value: "revenue", label: "revenue", checked: false },
      { value: "emission", label: "emission", checked: false },
      { value: "climate change", label: "climate change", checked: false },
      { value: "infrastructure", label: "infrastructure", checked: false },
      { value: "government", label: "government", checked: false },
      { value: "security", label: "security", checked: false },
      { value: "software", label: "software", checked: false },
      { value: "building", label: "building", checked: false },
      { value: "transportation", label: "transportation", checked: false },
      { value: "wealth", label: "wealth", checked: false },
      { value: "clothing", label: "clothing", checked: false },
      { value: "shortage", label: "shortage", checked: false },
      { value: "debt", label: "debt", checked: false },
      { value: "agriculture", label: "agriculture", checked: false },
      { value: "tax", label: "tax", checked: false },
      { value: "carbon", label: "carbon", checked: false },
      { value: "brexit", label: "brexit", checked: false },
      { value: "workforce", label: "workforce", checked: false },
      { value: "change", label: "change", checked: false },
      { value: "automaker", label: "automaker", checked: false },
      { value: "nuclear", label: "nuclear", checked: false },
      { value: "3D", label: "3D", checked: false },
      { value: "water", label: "water", checked: false },
      { value: "data", label: "data", checked: false },
      { value: "fossil fuel", label: "fossil fuel", checked: false },
      { value: "election", label: "election", checked: false },
      { value: "greenhouse gas", label: "greenhouse gas", checked: false },
      { value: "information", label: "information", checked: false },
      { value: "shale gas", label: "shale gas", checked: false },
      { value: "factory", label: "factory", checked: false },
      { value: "farm", label: "farm", checked: false },
      { value: "communication", label: "communication", checked: false },
      { value: "storm", label: "storm", checked: false },
      { value: "consumer", label: "consumer", checked: false },
      { value: "material", label: "material", checked: false },
      { value: "Washington", label: "Washington", checked: false },
      { value: "pollution", label: "pollution", checked: false },
      { value: "fracking", label: "fracking", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function List({ children }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});

  // const handleClick = (e, section, option) => {
  //   let filterValue = { ...filter, [section.id]: option.value };
  //   setFilter(filterValue);
  //   console.log(filterValue);
  //   console.log(filter);
  //   dispatch(fetchDataByFilterAsync(filter));
  // };
  const handleClick = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  useEffect(() => {
    dispatch(fetchDataByFilterAsync(filter));
  }, [dispatch, filter]);
  return (
    <div className="bg-white">
      <div className="bg-slate-100 h-2"></div>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      BlackCoffer
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onClick={(e) => {
                                        option.checked = !option.checked;
                                        handleClick(e, section, option);
                                      }}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
              BlackCoffer
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                ></Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onClick={(e) => {
                                    option.checked = !option.checked;
                                    handleClick(e, section, option);
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 grid bg-white">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
