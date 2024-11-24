'use client';

import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

type ERPModuleSearchProps = {
  selectedModule: string;
  modules: {
    [key: string]: {
      placeholder: string;
      showSearch: boolean;
    };
  };
};

export default function ERPModuleSearchAndSort({ selectedModule, modules }: ERPModuleSearchProps) {
  const moduleConfig = modules[selectedModule];

  if (!moduleConfig) {
    return <p className="text-gray-500">Invalid module selected. Please configure it properly.</p>;
  }

  const { placeholder, showSearch } = moduleConfig;

  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      {/* Module-Specific Title */}
      <h3 className="text-base font-semibold text-gray-900">{selectedModule} Management</h3>

      {/* Search and Sort Section */}
      <div className="mt-3 sm:ml-4 sm:mt-0">
        {showSearch && (
          <div className="flex rounded-md shadow-sm">
            {/* Search Input */}
            <div className="relative grow focus-within:z-10">
              <label htmlFor={`search-${selectedModule}`} className="sr-only">
                Search in {selectedModule}
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id={`search-${selectedModule}`}
                name={`search-${selectedModule}`}
                type="text"
                placeholder={placeholder}
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>

            {/* Sort Button */}
            <button
              type="button"
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <BarsArrowUpIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
              Sort
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
