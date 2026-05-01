export default function AddRoute() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Route</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="routeName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Route Name
          </label>
          <input
            type="text"
            id="routeName"
            name="routeName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter route name"
          />
        </div>
        <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Origin
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter origin location"
            />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter destination location"
            />
          </div>    
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save Route
          </button>
        </div>
      </form>
    </div>
  );
}