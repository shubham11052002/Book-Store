import React, { useState } from 'react';
import classNames from 'classnames';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilUser,
  cilBook,
  cilTruck,
  cilPlus,
  cilSearch,
  cilPencil,
  cilTrash,
  cilCheckCircle,
  cilWarning,
  cilBarChart,
  cilPeople,
  cilLibrary,
  cilSpreadsheet,
} from '@coreui/icons';

const Dashboard = () => {
  // Sample data for books
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      isbn: '9780743273565',
      status: 'Available',
      rating: 4.5,
      publishedYear: 1925,
      pages: 180,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      isbn: '9780061120084',
      status: 'Borrowed',
      rating: 4.8,
      publishedYear: 1960,
      pages: 281,
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      isbn: '9780451524935',
      status: 'Available',
      rating: 4.7,
      publishedYear: 1949,
      pages: 328,
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Classic',
      isbn: '9780141439518',
      status: 'Reserved',
      rating: 4.2,
      publishedYear: 1813,
      pages: 432,
    },
    {
      id: 5,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      isbn: '9780547928227',
      status: 'Available',
      rating: 4.6,
      publishedYear: 1937,
      pages: 310,
    },
  ]);

  // Sample data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Member',
      joined: '2023-01-15',
      booksBorrowed: 3,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      role: 'Librarian',
      joined: '2022-08-22',
      booksBorrowed: 0,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'm.brown@example.com',
      role: 'Member',
      joined: '2023-03-10',
      booksBorrowed: 5,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Sarah Davis',
      email: 'sarahd@example.com',
      role: 'Admin',
      joined: '2021-11-05',
      booksBorrowed: 1,
      status: 'Inactive',
    },
  ]);

  // Sample data for deliveries
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      orderId: 'ORD-001',
      customer: 'John Smith',
      book: 'The Great Gatsby',
      status: 'Delivered',
      date: '2023-06-15',
    },
    {
      id: 2,
      orderId: 'ORD-002',
      customer: 'Emma Johnson',
      book: '1984',
      status: 'In Transit',
      date: '2023-06-18',
    },
    {
      id: 3,
      orderId: 'ORD-003',
      customer: 'Michael Brown',
      book: 'The Hobbit',
      status: 'Processing',
      date: '2023-06-19',
    },
    {
      id: 4,
      orderId: 'ORD-004',
      customer: 'Sarah Davis',
      book: 'Pride and Prejudice',
      status: 'Delivered',
      date: '2023-06-12',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('books');
  const [visible, setVisible] = useState(false);

  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats data
  const statsData = [
    { title: 'Total Books', value: '1,248', icon: cilBook, color: 'primary' },
    { title: 'Active Users', value: '843', icon: cilPeople, color: 'success' },
    { title: 'Pending Deliveries', value: '27', icon: cilTruck, color: 'warning' },
    { title: 'Total Orders', value: '1,578', icon: cilSpreadsheet, color: 'info' },
  ];

  const statusIcons = {
    Available: { icon: cilCheckCircle, color: 'success' },
    Borrowed: { icon: cilUser, color: 'warning' },
    Reserved: { icon: cilWarning, color: 'info' },
    Active: { icon: cilCheckCircle, color: 'success' },
    Inactive: { icon: cilWarning, color: 'danger' },
    Delivered: { icon: cilCheckCircle, color: 'success' },
    'In Transit': { icon: cilTruck, color: 'warning' },
    Processing: { icon: cilBarChart, color: 'info' },
  };

  return (
    <div className="book-dashboard">
      {/* Header Section */}
      <div className="mb-4">
        <h2>Book Management Dashboard</h2>
        <p className="text-body-secondary">Manage your library system efficiently</p>
      </div>

      {/* Stats Overview */}
      <CRow className="mb-4">
        {statsData.map((stat, index) => (
          <CCol xs={6} lg={3} key={index}>
            <CCard className="mb-4">
              <CCardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fs-4 fw-semibold">{stat.value}</div>
                    <div className="text-body-secondary text-uppercase fw-semibold small">
                      {stat.title}
                    </div>
                  </div>
                  <div className={`bg-${stat.color} p-3 rounded`}>
                    <CIcon icon={stat.icon} size="xl" className="text-white" />
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Navigation Tabs */}
      <CCard className="mb-4">
        <CCardHeader>
          <CButtonGroup role="group" aria-label="Basic example">
            <CButton 
              color={activeSection === 'books' ? 'primary' : 'outline-primary'} 
              onClick={() => setActiveSection('books')}
            >
              <CIcon icon={cilBook} className="me-2" /> Book Manager
            </CButton>
            <CButton 
              color={activeSection === 'users' ? 'primary' : 'outline-primary'} 
              onClick={() => setActiveSection('users')}
            >
              <CIcon icon={cilPeople} className="me-2" /> User Manager
            </CButton>
            <CButton 
              color={activeSection === 'deliveries' ? 'primary' : 'outline-primary'} 
              onClick={() => setActiveSection('deliveries')}
            >
              <CIcon icon={cilTruck} className="me-2" /> Delivery Manager
            </CButton>
          </CButtonGroup>
        </CCardHeader>
      </CCard>

      {/* Search and Add Section */}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CCol>
            <CCol md={6} className="text-end">
              <CButton color="primary">
                <CIcon icon={cilPlus} className="me-2" />
                Add New
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Content Section */}
      {activeSection === 'books' && (
        <CCard className="mb-4">
          <CCardHeader>
            <h5 className="mb-0">Book Inventory</h5>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary">Title</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Author</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Genre</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredBooks.map((book) => (
                  <CTableRow key={book.id}>
                    <CTableDataCell>
                      <div className="fw-semibold">{book.title}</div>
                      <div className="small text-body-secondary">ISBN: {book.isbn}</div>
                    </CTableDataCell>
                    <CTableDataCell>{book.author}</CTableDataCell>
                    <CTableDataCell>{book.genre}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CBadge color={
                        book.status === 'Available' ? 'success' : 
                        book.status === 'Borrowed' ? 'warning' : 'info'
                      }>
                        <CIcon icon={statusIcons[book.status].icon} className="me-1" />
                        {book.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="fw-semibold">{book.rating}/5</div>
                      <CProgress thin color="success" value={book.rating * 20} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="primary" variant="outline" size="sm" className="me-1">
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" variant="outline" size="sm">
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-between">
            <div>Showing {filteredBooks.length} of {books.length} books</div>
            <CButton color="primary" variant="outline">
              View All Books
            </CButton>
          </CCardFooter>
        </CCard>
      )}

      {activeSection === 'users' && (
        <CCard className="mb-4">
          <CCardHeader>
            <h5 className="mb-0">User Management</h5>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Role</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Books Borrowed
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user) => (
                  <CTableRow key={user.id}>
                    <CTableDataCell>
                      <div className="fw-semibold">{user.name}</div>
                      <div className="small text-body-secondary">Joined: {user.joined}</div>
                    </CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CBadge color={user.status === 'Active' ? 'success' : 'danger'}>
                        <CIcon icon={statusIcons[user.status].icon} className="me-1" />
                        {user.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="fw-semibold">{user.booksBorrowed}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="primary" variant="outline" size="sm" className="me-1">
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" variant="outline" size="sm">
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-between">
            <div>Showing {users.length} users</div>
            <CButton color="primary" variant="outline">
              Manage All Users
            </CButton>
          </CCardFooter>
        </CCard>
      )}

      {activeSection === 'deliveries' && (
        <CCard className="mb-4">
          <CCardHeader>
            <h5 className="mb-0">Delivery Management</h5>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary">Order ID</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Customer</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Book</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Date</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {deliveries.map((delivery) => (
                  <CTableRow key={delivery.id}>
                    <CTableDataCell>
                      <div className="fw-semibold">{delivery.orderId}</div>
                    </CTableDataCell>
                    <CTableDataCell>{delivery.customer}</CTableDataCell>
                    <CTableDataCell>{delivery.book}</CTableDataCell>
                    <CTableDataCell>{delivery.date}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CBadge color={
                        delivery.status === 'Delivered' ? 'success' : 
                        delivery.status === 'In Transit' ? 'warning' : 'info'
                      }>
                        <CIcon icon={statusIcons[delivery.status].icon} className="me-1" />
                        {delivery.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="primary" variant="outline" size="sm" className="me-1">
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" variant="outline" size="sm">
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-between">
            <div>Showing {deliveries.length} deliveries</div>
            <CButton color="primary" variant="outline">
              View All Deliveries
            </CButton>
          </CCardFooter>
        </CCard>
      )}

      {/* Quick Stats Section */}
      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <h6 className="mb-0">Popular Genres</h6>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Fiction</span>
                  <span className="fw-semibold">42%</span>
                </div>
                <CProgress thin color="primary" value={42} className="mt-1" />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Non-Fiction</span>
                  <span className="fw-semibold">28%</span>
                </div>
                <CProgress thin color="success" value={28} className="mt-1" />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Science Fiction</span>
                  <span className="fw-semibold">15%</span>
                </div>
                <CProgress thin color="info" value={15} className="mt-1" />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Biography</span>
                  <span className="fw-semibold">10%</span>
                </div>
                <CProgress thin color="warning" value={10} className="mt-1" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <h6 className="mb-0">Recent Activities</h6>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <div className="fw-semibold">New book added</div>
                <div className="small text-body-secondary">The Art of Programming added to collection</div>
                <div className="small text-body-secondary">2 hours ago</div>
              </div>
              <div className="mb-3">
                <div className="fw-semibold">Book borrowed</div>
                <div className="small text-body-secondary">To Kill a Mockingbird borrowed by John Doe</div>
                <div className="small text-body-secondary">5 hours ago</div>
              </div>
              <div className="mb-3">
                <div className="fw-semibold">Book returned</div>
                <div className="small text-body-secondary">1984 returned by Jane Smith</div>
                <div className="small text-body-secondary">Yesterday</div>
              </div>
              <div className="mb-3">
                <div className="fw-semibold">New member registered</div>
                <div className="small text-body-secondary">Sarah Johnson joined the library</div>
                <div className="small text-body-secondary">2 days ago</div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Dashboard;