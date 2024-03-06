import { currentUser } from '@/lib/auth'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  return (
    <div className="flex items-center h-screen w-full justify-center">

      <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={user?.image || ""}
              alt={user?.name || ""}
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user?.name || ""}</h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{user?.role}</p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td className="px-2 py-2 text-gray-500">{user?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default page