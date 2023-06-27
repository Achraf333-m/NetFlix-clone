import useAuth from "@/hooks/useAuth";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { MdLogout } from "react-icons/md";


export default function Dropdown() {

    const {loading} = useAuth()
    const router = useRouter()

    if (loading) return null

  return (
    <Menu as="div" className="w-24 h-12 relative flex items-center">
      <div className="w-full absolute right-1 group">
        <Menu.Button className="flex items-center w-fulltext-sm font-medium text-white rounded bg-[#1A1A1A]">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-800"
        enterFrom="transform opacity-0 scale-85"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-85"
      >
        <Menu.Items className="absolute right-0 w-32  mt-24 origin-top-right bg-[#1A1A1A] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-white/10"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white cursor-default`}
                  onClick={() => router.push('/account')}
                >
                  <MdLogout className="w-5 h-5 mr-2" aria-hidden="true" />
                  Account
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}