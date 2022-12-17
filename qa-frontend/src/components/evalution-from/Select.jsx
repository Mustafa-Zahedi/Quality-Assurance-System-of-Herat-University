import React, { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectDep = ({
  name,
  Type,
  Controller,
  control,
  options,
  placeholder,
  errors,
  setSelectedOptions,
  className,
  defaultValue,
  resetField,
  label,
}) => {
  // console.log("def", defaultValue, "type", Type);
  const [selectedItem, setSelectedItem] = useState([
    defaultValue?.[0] || placeholder,
    0,
  ]);

  useMemo(() => {
    setSelectedOptions && setSelectedOptions(selectedItem);
    if (name === "facultyId" && resetField) {
      resetField("departmentId");
    }
  }, [name, resetField, selectedItem, setSelectedOptions]);

  return (
    <Controller
      control={control}
      defaultValue={
        defaultValue ? defaultValue?.[1] : Type && Type === "number" ? null : ""
      }
      name={name}
      render={({ field: { onChange } }) => (
        <Listbox
          onChange={(e) => {
            // console.log(e, "onchange");
            onChange(e[1]);
            setSelectedItem(e);
          }}
          as={"div"}
          value={defaultValue || selectedItem}
          className="relative grid items-center md:grid-cols-2 grid-cols-1"
          disabled={className}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium">
                {label}
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-right shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 sm:text-sm disabled:text-gray-300"
                  disabled={className}
                >
                  <span className="block truncate">{selectedItem[0]}</span>
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-150 ease-out"
                  enterFrom="transform scale-90 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-90 opacity-0"
                >
                  <Listbox.Options className="absolute top-10 w-full z-10 mt-1 max-h-60  overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options?.map((opt, ndx) => (
                      <Listbox.Option
                        key={ndx}
                        value={opt}
                        className={({ active }) =>
                          classNames(
                            active ? "text-white bg-cyan-600" : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-8 pr-4"
                          )
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {opt[0]}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-cyan-600",
                                  "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
                {errors[name] && (
                  <p className="text-red-500 text-xs">
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            </>
          )}
        </Listbox>
      )}
    />
  );
};

export default SelectDep;
