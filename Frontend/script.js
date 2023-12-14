$(document).ready(function () {
  const employeeList = $('#employeeList');

  // Function to fetch and display employees
  function fetchEmployees() {
      $.ajax({
          url: 'http://localhost:3000/api/employee',
          method: 'GET',
          crossDomain: true,
          xhrFields: {
              withCredentials: true,
          },
          dataType: 'json',
          success: function (data) {
              employeeList.empty(); // Clear previous list

              $.each(data, function (index, employee) {
                  const listItem = $('<li>').text(`Title: ${employee.title}, Details: ${employee.details}, Salary: ${employee.salary}`);

                  // Add update and delete buttons
                  const updateButton = $('<button>').text('Update').on('click', function () {
                      updateEmployee(employee._id);
                  });

                  const deleteButton = $('<button>').text('Delete').on('click', function () {
                      deleteEmployee(employee._id);
                  });

                  listItem.append(updateButton, deleteButton);
                  employeeList.append(listItem);
              });
          },
          error: function (error) {
              console.error('Error fetching employees:', error);
          }
      });
  }

  // Initial fetch on page load
  fetchEmployees();

  // Function to add a new employee
  window.addEmployee = function () {
      const title = $('#title').val();
      const details = $('#details').val();
      const salary = $('#salary').val();

      $.ajax({
          url: 'http://localhost:3000/api/employee',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ title, details, salary }),
          dataType: 'json',
          success: function (data) {
              console.log('New employee added:', data);
              // Fetch and display employees again after adding a new employee
              fetchEmployees();
          },
          error: function (error) {
              console.error('Error adding employee:', error);
          }
      });
  }

// Function to update an employee
window.updateEmployee = function (employeeId) {
  // Assuming you want to show a prompt for the user to enter new details
  const newTitle = prompt('Enter new title:');
  const newDetails = prompt('Enter new details:');
  const newSalary = prompt('Enter new salary:');

  // Make a PUT request to update the employee on the server
  $.ajax({
      url: `http://localhost:3000/api/employee/${employeeId}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ title: newTitle, details: newDetails, salary: newSalary }),
      dataType: 'json',
      success: function (data) {
          console.log(`Employee with ID ${employeeId} updated:`, data);
          // Fetch and display employees again after updating an employee
          fetchEmployees();
      },
      error: function (error) {
          console.error(`Error updating employee with ID ${employeeId}:`, error);
      }
  });
}

// Function to delete an employee
window.deleteEmployee = function (employeeId) {
  // Assuming you want to show a confirmation dialog
  const confirmed = confirm('Are you sure you want to delete this employee?');

  if (confirmed) {
      // Make a DELETE request to remove the employee from the server
      $.ajax({
          url: `http://localhost:3000/api/employee/${employeeId}`,
          method: 'DELETE',
          success: function (data) {
              console.log(`Employee with ID ${employeeId} deleted:`, data);
              // Fetch and display employees again after deleting an employee
              fetchEmployees();
          },
          error: function (error) {
              console.error(`Error deleting employee with ID ${employeeId}:`, error);
          }
      });
  }
}

});
