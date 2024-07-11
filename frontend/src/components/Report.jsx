import React from "react";

const Report = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Project Features Report</h1>
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Frontend Features</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">React and Redux</h3>
            <ul className="list-disc pl-6">
              <li>
                State Management: Use Redux to manage the application's state,
                including restaurant data and search term.
              </li>
              <li>
                Action Creators and Reducers: Implement action creators (
                <code>addRestaurant</code>, <code>deleteRestaurant</code>,{" "}
                <code>updateRestaurant</code>, <code>searchRestaurant</code>)
                and corresponding reducers to handle state changes.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">React Router</h3>
            <ul className="list-disc pl-6">
              <li>
                Navigation: Use <code>react-router-dom</code> for navigation
                between different components (e.g., Restaurant List, Add
                Restaurant).
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Forms and Input Handling</h3>
            <ul className="list-disc pl-6">
              <li>
                Controlled Components: Manage form input values using state to
                control form elements.
              </li>
              <li>
                Validation: Add validation rules for form inputs to ensure
                correct data entry.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Components</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>RestaurantList:</strong> Display a paginated list of
                restaurants with search functionality.
              </li>
              <li>
                <strong>EditRestaurant:</strong> Provide a form for editing
                restaurant details with input validation.
              </li>
              <li>
                <strong>EditModal:</strong> Display a modal for editing
                restaurant details.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Styling</h3>
            <ul className="list-disc pl-6">
              <li>
                Tailwind CSS: Use Tailwind CSS for styling components, providing
                a responsive and modern UI.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">API Integration</h3>
            <ul className="list-disc pl-6">
              <li>
                API Utils: Create utility functions (<code>getData</code>,{" "}
                <code>postData</code>) to interact with backend APIs.
              </li>
              <li>
                Constants: Define constants for API endpoints (e.g.,{" "}
                <code>DELETE_DATA</code>, <code>GET_DATA</code>,{" "}
                <code>UPDATE_DATA</code>).
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Pagination</h3>
            <ul className="list-disc pl-6">
              <li>
                Paginate Data: Implement pagination to manage large datasets,
                displaying a limited number of records per page.
              </li>
              <li>
                Page Navigation: Provide controls for navigating between pages.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Search Functionality</h3>
            <ul className="list-disc pl-6">
              <li>
                Filter Data: Implement search functionality to filter
                restaurants by name.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Image Upload Feature</h3>
            <ul className="list-disc pl-6">
              <li>
                Image Upload: Added functionality to upload and store restaurant
                images.
              </li>
              <li>
                FormData Handling: Modified form submission to handle image
                files using FormData.
              </li>
              <li>
                Backend Integration: Integrated multer for image upload
                processing on the server.
              </li>
              <li>
                Image Validation: Added validation to ensure only images are
                uploaded.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Backend Features</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Express.js</h3>
            <ul className="list-disc pl-6">
              <li>
                Server Setup: Set up an Express.js server to handle API
                requests.
              </li>
              <li>
                Routes: Define routes for CRUD operations (Create, Read, Update,
                Delete) on restaurant data.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">CRUD Operations</h3>
            <ul className="list-disc pl-6">
              <li>Create: Implement API endpoints to add new restaurants.</li>
              <li>
                Read: Implement API endpoints to retrieve restaurant data,
                including search and pagination.
              </li>
              <li>
                Update: Implement API endpoints to update existing restaurant
                details.
              </li>
              <li>Delete: Implement API endpoints to delete restaurants.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Validation</h3>
            <ul className="list-disc pl-6">
              <li>
                Input Validation: Validate incoming data to ensure it meets the
                required criteria before processing.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Deployment</h3>
            <ul className="list-disc pl-6">
              <li>
                Server Deployment: Deploy the backend server to a cloud provider
                (e.g., Heroku, AWS).
              </li>
              <li>
                Environment Variables: Use environment variables to manage
                sensitive information (e.g., database connection strings).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
