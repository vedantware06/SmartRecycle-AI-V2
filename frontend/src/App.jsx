

import { useEffect, useState } from 'react'

import './App.css'



const API = 'http://127.0.0.1:8000'



const translations = {

  English: {

    dashboard: 'Dashboard',

    stock: 'Stock Management',

    purchase: 'Purchase / Sale',

    market: 'Market Prices',

    transactions: 'Transactions',

    customers: 'Customer Requests',

    business: 'BUSINESS MANAGEMENT',

    online: 'System Online',

    welcome: 'Welcome back',

    banner: 'Recycling made smarter.',

    bannerText: 'Manage your recycling business from one place.',

    purchases: 'Total Purchases',

    sales: 'Total Sales',

    available: 'Available Stock',

    materials: 'Market Materials',

    quick: 'Quick Actions',

    choose: 'Choose a module to manage your business.',

    recent: 'Recent Activity',

    login: 'Login',

    register: 'Register',

    create: 'Create Account',

    back: 'Welcome Back!',

    signin: 'Sign in to your account.',

    username: 'Username',

    password: 'Password',

    usernameHint: 'Enter your username',

    passwordHint: 'Enter your password',

    slogan: 'Smart recycling. Smarter business.',

    logout: 'Logout',

    logged: 'Logged in as',

    language: 'Language',

    name: 'Customer name',

    mobile: 'Mobile number',

    material: 'Scrap material',

    quantity: 'Estimated quantity (kg)',

    pickup: 'Pickup method',

    homePickup: 'Home Pickup',

    shopDrop: 'Shop Drop-off',

    address: 'Pickup address',

    notes: 'Additional notes',

    submit: 'Submit Scrap Request',

    requests: 'Submitted Requests',

    noRequests: 'No customer requests yet.',

    pending: 'Pending',

    loading: 'Loading...',

    success: 'Scrap request submitted successfully!',

    requiredAddress: 'Please enter the pickup address.',

    error: 'Something went wrong. Please try again.',

    selectMaterial: 'Select material',

    plastic: 'Plastic',

    paper: 'Paper',

    metal: 'Metal',

    cardboard: 'Cardboard',

    glass: 'Glass',

    other: 'Other',

    status: 'Status',

    date: 'Date',

    backDashboard: 'Back to Dashboard',

    registrationSuccess: 'Registration successful! Please log in.',

    backendError: 'Backend is not running. Start the FastAPI server.',

    wait: 'Please wait...',

    moduleText: 'Select transaction type, enter material details, quantity and rate, then save your transaction.'

  },

  Marathi: {

    dashboard: 'मुख्य डॅशबोर्ड',

    stock: 'स्टॉक व्यवस्थापन',

    purchase: 'खरेदी / विक्री',

    market: 'बाजारभाव',

    transactions: 'व्यवहार नोंदी',

    customers: 'ग्राहकांच्या रिक्वेस्ट',

    business: 'व्यवसाय व्यवस्थापन',

    online: 'सिस्टम सुरू आहे',

    welcome: 'पुन्हा स्वागत आहे',

    banner: 'आता रिसायकलिंग व्यवसाय अधिक स्मार्ट!',

    bannerText: 'तुमचा व्यवसाय एकाच ठिकाणी सांभाळा.',

    purchases: 'एकूण खरेदी',

    sales: 'एकूण विक्री',

    available: 'उपलब्ध स्टॉक',

    materials: 'बाजारभावातील वस्तू',

    quick: 'जलद पर्याय',

    choose: 'व्यवसाय व्यवस्थापित करण्यासाठी विभाग निवडा.',

    recent: 'अलीकडील नोंदी',

    login: 'लॉगिन',

    register: 'नोंदणी',

    create: 'खाते तयार करा',

    back: 'पुन्हा स्वागत आहे!',

    signin: 'तुमच्या खात्यात लॉगिन करा.',

    username: 'वापरकर्त्याचे नाव',

    password: 'पासवर्ड',

    usernameHint: 'तुमचे नाव टाका',

    passwordHint: 'पासवर्ड टाका',

    slogan: 'स्मार्ट रिसायकलिंग. स्मार्ट व्यवसाय.',

    logout: 'लॉगआउट',

    logged: 'लॉगिन केलेले खाते',

    language: 'भाषा',

    name: 'ग्राहकाचे नाव',

    mobile: 'मोबाइल नंबर',

    material: 'Scrap चा प्रकार',

    quantity: 'अंदाजे वजन (किलो)',

    pickup: 'Scrap देण्याची पद्धत',

    homePickup: 'घरून उचलणे',

    shopDrop: 'दुकानात आणून देणे',

    address: 'उचलण्याचा पत्ता',

    notes: 'अतिरिक्त माहिती',

    submit: 'Scrap रिक्वेस्ट पाठवा',

    requests: 'पाठवलेल्या रिक्वेस्ट',

    noRequests: 'अजून कोणतीही रिक्वेस्ट नाही.',

    pending: 'प्रलंबित',

    loading: 'लोड होत आहे...',

    success: 'Scrap रिक्वेस्ट यशस्वीपणे पाठवली!',

    requiredAddress: 'कृपया पत्ता भरा.',

    error: 'काहीतरी चुकले. पुन्हा प्रयत्न करा.',

    selectMaterial: 'प्रकार निवडा',

    plastic: 'प्लास्टिक',

    paper: 'कागद',

    metal: 'धातू',

    cardboard: 'पुठ्ठा',

    glass: 'काच',

    other: 'इतर',

    status: 'स्थिती',

    date: 'दिनांक',

    backDashboard: 'डॅशबोर्डवर परत जा',

    registrationSuccess: 'नोंदणी यशस्वी! आता लॉगिन करा.',

    backendError: 'Backend सुरू नाही. FastAPI सुरू करा.',

    wait: 'कृपया थांबा...',

    moduleText: 'व्यवहाराचा प्रकार निवडा, Scrap चा तपशील, वजन आणि दर भरा व व्यवहार सेव्ह करा.'

  }

}



 
function App() {


  const [language, setLanguage] = useState('English')

  const [isRegister, setIsRegister] = useState(false)

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)
const [activePage
  , setActivePage] = useState('Dashboard')

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState('')

  const [requests, setRequests] = useState([])

  const [requestLoading, setRequestLoading] = useState(false)



  const [form, setForm] = useState({

    customer_name: '',

    mobile_number: '',

    material: '',

    estimated_quantity_kg: '',

    pickup_method: 'Shop Drop-off',

    pickup_address: '',

    customer_notes: ''

  })



  const t = translations[language]



  const pages = [

    { key: 'Dashboard', label: t.dashboard, icon: '▦' },

    { key: 'Stock Management', label: t.stock, icon: '♻' },

    { key: 'Purchase / Sale', label: t.purchase, icon: '⇄' },

    { key: 'Market Prices', label: t.market, icon: '₹' },

    { key: 'Transactions', label: t.transactions, icon: '▤' },

    { key: 'Customer Requests', label: t.customers, icon: '👥' }

  ]



   async function handleSubmit(e) {

    e.preventDefault()

    setMessage('')

    setLoading(true)



    try {

      const response = await fetch(

        `${API}/auth/${isRegister ? 'register' : 'login'}`,

        {

          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({ username, password })

        }

      )



      const data = await response.json()



      if (!response.ok) {

        setMessage(data.detail || t.error)
      } else if (isRegister) {

        setMessage(t.registrationSuccess)

        setIsRegister(false)

        setPassword('')

      } else {

        setUsername(data.username)

        setLoggedIn(true)

        setMessage('')

      }

    } catch {

      setMessage(t.backendError)

    } finally {

      setLoading(false)

    }

  }



  async function loadRequests() {

    setRequestLoading(true)

    setMessage('')



    try {

      const response = await fetch(`${API}/customer-requests/`)

      if (!response.ok) throw new Error('Could not load requests')



      const data = await response.json()

      setRequests(data)

    } catch {

      setMessage(t.backendError)

    } finally {

      setRequestLoading(false)

    }

  }



  async function updateRequestStatus(requestId, newStatus) {
    setMessage('')
    try {
      const response = await fetch(`${API}/customer-requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Status update failed')
      await loadRequests()
      setMessage(`Request #${requestId} status updated to ${newStatus}`)
    } catch (error) {
      setMessage(error.message || 'Could not update status')
    }
  }

  useEffect(() => {

    if (loggedIn && activePage === 'Customer Requests') {

      loadRequests()

    }

  }, [loggedIn, activePage])



  function updateForm(e) {

    setForm({ ...form, [e.target.name]: e.target.value })

  }



  async function submitScrapRequest(e) {

    e.preventDefault()

    setMessage('')



    if (

      form.pickup_method === 'Home Pickup' &&

      !form.pickup_address.trim()

    ) {

      setMessage(t.requiredAddress)

      return

    }



    setLoading(true)



    try {

      const response = await fetch(`${API}/customer-requests/`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          ...form,

          estimated_quantity_kg: Number(form.estimated_quantity_kg),

          pickup_address: form.pickup_address.trim() || null,

          customer_notes: form.customer_notes.trim() || null

        })

      })



      const data = await response.json()



      if (!response.ok) {

        const detail = Array.isArray(data.detail)

          ? data.detail.map(item => item.msg).join(', ')

          : data.detail



        throw new Error(detail || t.error)

      }



      setMessage(`${t.success} ID: ${data.request_id}`)



      setForm({

        customer_name: '',

        mobile_number: '',

        material: '',

        estimated_quantity_kg: '',

        pickup_method: 'Shop Drop-off',

        pickup_address: '',

        customer_notes: ''

      })



      await loadRequests()

    } catch (error) {

      setMessage(error.message || t.backendError)

    } finally {

      setLoading(false)

    }

  }



  function logout() {

    setLoggedIn(false)

    setPassword('')

    setMessage('')

    setActivePage('Dashboard')

  }



  const inputStyle = {

    width: '100%',

    padding: '11px',

    marginTop: '6px',

    marginBottom: '14px',

    border: '1px solid #d1d5db',

    borderRadius: '8px',

    boxSizing: 'border-box',

    fontSize: '15px'

  }



  const panelStyle = {

    background: '#fff',

    padding: '22px',

    borderRadius: '14px',

    marginBottom: '20px',

    boxShadow: '0 3px 14px rgba(0,0,0,0.05)'

  }



  if (!loggedIn) {

    return (

      <main className="app">

        <section className="login-card">

          <div className="brand-icon">♻️</div>

          <h1>SmartRecycle <span>AI</span></h1>

          <p className="subtitle">Recycling Business Management System</p>



          <label className="login-language">

            🌐 {t.language}

            <select

              value={language}

              onChange={e => setLanguage(e.target.value)}

            >

              <option value="English">English</option>

              <option value="Marathi">मराठी</option>

            </select>

          </label>



          <div className="tabs">

            <button

              className={!isRegister ? 'active' : ''}

              onClick={() => {

                setIsRegister(false)

                setMessage('')

              }}

            >

              {t.login}

            </button>

            <button

              className={isRegister ? 'active' : ''}

              onClick={() => {

                setIsRegister(true)

                setMessage('')

              }}

            >

              {t.register}

            </button>

          </div>



          <h2>{isRegister ? t.create : t.back}</h2>

          <p className="hint">{isRegister ? t.create : t.signin}</p>



          <form onSubmit={handleSubmit}>

            <label>{t.username}</label>

            <input

              type="text"

              placeholder={t.usernameHint}

              value={username}

              onChange={e => setUsername(e.target.value)}

              minLength={3}

              required

            />



            <label>{t.password}</label>

            <input

              type="password"

              placeholder={t.passwordHint}

              value={password}

              onChange={e => setPassword(e.target.value)}

              minLength={8}

              required

            />



            <button className="submit-btn" type="submit" disabled={loading}>

              {loading ? t.wait : isRegister ? t.create : t.login}

            </button>

          </form>



          {message && <p className="message" role="status">{message}</p>}

          <p className="footer">♻️ {t.slogan}</p>

        </section>

      </main>

    )

  }



  return (

    <div className="dashboard-layout">

      <aside className="sidebar">

        <h2>♻️ SmartRecycle <span>AI</span></h2>

        <p className="side-caption">{t.business}</p>



        {pages.map(page => (

          <button

            key={page.key}

            className={`nav-item ${activePage === page.key ? 'selected' : ''}`}

            onClick={() => {

              setActivePage(page.key)

              setMessage('')

            }}

          >

            {page.icon} <span>{page.label}</span>

          </button>

        ))}



        <div className="side-bottom">

          <p>{t.logged}</p>

          <strong>👤 {username}</strong>

          <button className="logout-btn" onClick={logout}>

            ↪ {t.logout}

          </button>

        </div>

      </aside>



      <main className="dashboard-main">

        <header className="topbar">

          <div>

            <h1>{pages.find(p => p.key === activePage)?.label}</h1>

            <p>{t.welcome}, {username}!</p>

          </div>



          <div className="topbar-actions">

            <label className="language-label">

              🌐 {t.language}

              <select

                value={language}

                onChange={e => setLanguage(e.target.value)}

              >

                <option value="English">English</option>

                <option value="Marathi">मराठी</option>

              </select>

            </label>

            <div className="status-pill">● {t.online}</div>

          </div>

        </header>



        {activePage === 'Dashboard' && (

          <>

            <section className="welcome-banner">

              <div>

                <h2>{t.banner}</h2>

                <p>{t.bannerText}</p>

              </div>

              <span>♻️</span>

            </section>



            <section className="stats-grid">

              <article className="stat-card">

                <span>📥</span><p>{t.purchases}</p>

                <h2>₹0.00</h2><small>{t.purchase}</small>

              </article>

              <article className="stat-card">

                <span>📤</span><p>{t.sales}</p>

                <h2>₹0.00</h2><small>{t.purchase}</small>

              </article>

              <article className="stat-card">

                <span>♻️</span><p>{t.available}</p>

                <h2>0 kg</h2><small>{t.stock}</small>

              </article>

              <article className="stat-card">

                <span>💹</span><p>{t.materials}</p>

                <h2>0</h2><small>{t.market}</small>

              </article>

            </section>



            <section className="content-panel">

              <h2>{t.quick}</h2>

              <p>{t.choose}</p>

              <div className="quick-grid">

                <button onClick={() => setActivePage('Purchase / Sale')}>＋ {t.purchase}</button>

                <button onClick={() => setActivePage('Stock Management')}>♻ {t.stock}</button>

                <button onClick={() => setActivePage('Market Prices')}>₹ {t.market}</button>

                <button onClick={() => setActivePage('Transactions')}>▤ {t.transactions}</button>

                <button onClick={() => setActivePage('Customer Requests')}>👥 {t.customers}</button>

              </div>

            </section>



            <section className="content-panel">

              <h2>{t.recent}</h2>

              <p>{t.choose}</p>

            </section>

          </>

        )}



        {activePage === 'Customer Requests' && (

          <>

            <section style={panelStyle}>

              <h2>♻️ {t.submit}</h2>

              <p>Enter the customer's details to record a scrap collection request.</p>



              <form onSubmit={submitScrapRequest}>

                <label>{t.name}</label>

                <input

                  style={inputStyle}

                  name="customer_name"

                  value={form.customer_name}

                  onChange={updateForm}

                  minLength={2}

                  maxLength={150}

                  required

                />



                <label>{t.mobile}</label>

                <input

                  style={inputStyle}

                  name="mobile_number"

                  value={form.mobile_number}

                  onChange={updateForm}

                  minLength={10}

                  maxLength={20}

                  required

                />



                <label>{t.material}</label>

                <select

                  style={inputStyle}

                  name="material"

                  value={form.material}

                  onChange={updateForm}

                  required

                >

                  <option value="">{t.selectMaterial}</option>

                  <option value="Plastic">{t.plastic}</option>

                  <option value="Paper">{t.paper}</option>

                  <option value="Metal">{t.metal}</option>

                  <option value="Cardboard">{t.cardboard}</option>

                  <option value="Glass">{t.glass}</option>

                  <option value="Other">{t.other}</option>

                </select>



                <label>{t.quantity}</label>

                <input

                  style={inputStyle}

                  type="number"

                  name="estimated_quantity_kg"

                  value={form.estimated_quantity_kg}

                  onChange={updateForm}

                  min="0.1"

                  step="0.1"

                  required

                />



                <label>{t.pickup}</label>

                <select

                  style={inputStyle}

                  name="pickup_method"

                  value={form.pickup_method}

                  onChange={updateForm}

                >

                  <option value="Shop Drop-off">{t.shopDrop}</option>

                  <option value="Home Pickup">{t.homePickup}</option>

                </select>



                {form.pickup_method === 'Home Pickup' && (

                  <>

                    <label>{t.address}</label>

                    <textarea

                      style={inputStyle}

                      name="pickup_address"

                      value={form.pickup_address}

                      onChange={updateForm}

                      required

                    />

                  </>

                )}



                <label>{t.notes}</label>

                <textarea

                  style={inputStyle}

                  name="customer_notes"

                  value={form.customer_notes}

                  onChange={updateForm}

                  rows={3}

                />



                <button

                  className="submit-btn"

                  type="submit"

                  disabled={loading}

                >

                  {loading ? t.wait : t.submit}

                </button>

              </form>



              {message && (

                <p role="status" style={{ marginTop: '15px', overflowWrap: 'anywhere' }}>

                  {message}

                </p>

              )}

            </section>



            <section style={panelStyle}>

              <h2>📋 {t.requests}</h2>



              <button

                className="module-btn"

                onClick={loadRequests}

                disabled={requestLoading}

              >

                {requestLoading ? t.loading : '↻ Refresh'}

              </button>



              {requestLoading ? (

                <p>{t.loading}</p>

              ) : requests.length === 0 ? (

                <p>{t.noRequests}</p>

              ) : (

                <div style={{ overflowX: 'auto', marginTop: '16px' }}>

                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>

                    <thead>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{t.name}</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{t.material}</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{t.quantity}</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{t.pickup}</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Photo</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(item => {
                const photoUrl = item.photo_path
                  ? `${API}/${item.photo_path.replace(/^\/+/, '')}`
                  : ''
                return (
                  <tr key={item.id}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.id}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.customer_name}<br /><small>{item.mobile_number}</small></td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.material}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.estimated_quantity_kg} kg</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.pickup_method}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      {photoUrl ? (
                        <a href={photoUrl} target="_blank" rel="noreferrer">
                          <img src={photoUrl} alt={`Scrap from ${item.customer_name}`} style={{ width: '76px', height: '64px', objectFit: 'cover', borderRadius: '8px' }} />
                        </a>
                      ) : 'No photo'}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      <select value={item.status} onChange={e => updateRequestStatus(item.id, e.target.value)} style={{ padding: '7px', borderRadius: '6px', border: '1px solid #ccc' }}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Collected">Collected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>

                  </table>

                </div>

              )}

            </section>

          </>

        )}



        

  {activePage === 'Purchase / Sale' && (
  <section className="content-panel module-panel">
    <h2>♻️ Purchase / Sale</h2>
    <p>Purchase / Sale form is coming next.</p>
    <button
      className="module-btn"
      onClick={() => setActivePage('Dashboard')}
    >
      ← {t.backDashboard}
    </button>
  </section>
)}

            {activePage === 'Purchase / Sale' && (
          <section className="content-panel module-panel">
            <h2>♻️ Purchase / Sale</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setMessage('Saving transaction...')
                const formData = new FormData(e.currentTarget)

                try {
                  const response = await fetch(`${API}/transactions/`, {
                    method: 'POST',
                    body: formData
                  })
                  const data = await response.json()

                  if (!response.ok) {
                    setMessage(data.detail || 'Could not save transaction')
                    return
                  }

                  setMessage('Transaction saved successfully!')
                  e.currentTarget.reset()
                } catch {
                  setMessage('Backend is not running.')
                }
              }}
              style={{ display: 'grid', gap: '14px', textAlign: 'left' }}
            >
              <label>Transaction Type</label>
              <select name="transaction_type" required style={inputStyle}>
                <option value="Purchase">Purchase</option>
                <option value="Sale">Sale</option>
              </select>

              <label>Scrap Material</label>
              <select name="material" required style={inputStyle}>
                <option value="">Select material</option>
                <option value="Plastic">Plastic</option>
                <option value="Paper">Paper</option>
                <option value="Metal">Metal</option>
                <option value="Cardboard">Cardboard</option>
                <option value="Glass">Glass</option>
                <option value="Other">Other</option>
              </select>

              <label>Quantity (kg)</label>
              <input
                name="quantity_kg"
                type="number"
                min="0.01"
                step="0.01"
                required
                style={inputStyle}
              />

              <label>Rate per kg (₹)</label>
              <input
                name="rate_per_kg"
                type="number"
                min="0"
                step="0.01"
                required
                style={inputStyle}
              />

              <label>Condition</label>
              <select name="condition" style={inputStyle}>
                <option>Good</option>
                <option selected>Average</option>
                <option>Poor</option>
              </select>

              <label>Party / Customer Name</label>
              <input name="party_name" style={inputStyle} />

              <label>Scrap Photo (optional)</label>
              <input
                name="photo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                style={inputStyle}
              />

              <label>Notes</label>
              <textarea name="notes" style={inputStyle} rows={2} />

              <button className="submit-btn" type="submit">
                Save Transaction
              </button>
            </form>

            {message && <p role="status">{message}</p>}
          </section>
        )}

        {activePage !== 'Dashboard' &&
          activePage !== 'Customer Requests' &&
          activePage !== 'Purchase / Sale' && (
            <section className="content-panel module-panel">
              <div className="module-icon">♻️</div>
              <h2>{pages.find(p => p.key === activePage)?.label}</h2>
              <p>{t.moduleText}</p>
              <button
                className="module-btn"
                onClick={() => setActivePage('Dashboard')}
              >
                ← {t.backDashboard}
              </button>
            </section>
          )} 
      </main>
    </div>
  )
}


       
export default App