
# 📸 Wobot.ai Camera Management Dashboard

A **responsive React-based dashboard** built for the Wobot.ai frontend assignment. It provides a rich user interface for managing and viewing camera data efficiently, with features like filtering, searching, pagination, and status toggling—all designed with clean code practices, performance, and great user experience in mind.


## ⚙️ Features

✅ **Responsive UI**

* 📱 **Mobile (Card Layout)**: Cameras displayed as individual cards for better readability
* 💻 **Desktop (Table Layout)**: Full data table with horizontal scroll support for large datasets

✅ **Camera Health Indicators**

* Visual cloud and device health via circular dashed borders using `borderImage`
* 💚 Green for Healthy (≥80%)
* 🔴 Red for Warning (<80%)
* ⚪ Grey for inactive (20%)

✅ **Selection & Bulk Actions**

* Individual and "Select All" checkboxes with synchronized state
* Status toggling (Active/Inactive) with color feedback
* Conditional delete option (only if a warning icon appears)

✅ **Filtering, Search & Pagination**

* Filter by **location** and **status**
* Search by camera **name** or **ID**
* Custom pagination with adjustable items per page

✅ **Accessibility**

* ARIA labels and titles for screen readers
* Keyboard-navigable UI components

---

## 🧠 Tech Stack

* **React.js 18**
* **Tailwind CSS 3**
* **Axios**
* **React Icons**
* **HTML5/CSS3**
* **Vite** (for faster dev builds)

---

## 🗂️ File Structure

```
wobot-ai-camera-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CameraTable.jsx
│   │   ├── Filters.jsx
│   │   ├── Header.jsx
│   │   ├── Pagination.jsx
│   │   └── SearchBar.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Getting Started

### 🔧 Prerequisites

* Node.js ≥ 18.x
* npm or yarn
* Git

### 📦 Installation

```bash
git clone https://github.com/your-username/wobot-ai-camera-dashboard.git
cd wobot-ai-camera-dashboard
npm install
```

### 💡 Tailwind Setup

Ensure your `tailwind.config.js` contains:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

Initialize if not present:

```bash
npx tailwindcss init
```

### ▶️ Run the App

```bash
npm run dev
```

App will be available at: [http://localhost:3000](http://localhost:3000)

### 📦 Production Build

```bash
npm run build
```

---

## 🔗 API Integration

* The app fetches camera data from:

  ```
  https://api-app-staging.wobot.ai/app/v1/fetch/cameras
  ```

### Sample `useEffect` Hook:

```jsx
useEffect(() => {
  axios.get('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
    headers: {
      Authorization: 'Bearer <YOUR-TOKEN>',
    },
  })
    .then((res) => setCameras(res.data.data || []))
    .catch((err) => console.error("API Error", err));
}, []);
```

You can also mock this endpoint using tools like [MockAPI.io](https://mockapi.io/) or [json-server](https://www.npmjs.com/package/json-server).

---

## 📷 How It Works

| Feature          | Description                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| Table / Card UI  | Displays camera properties: Name, Health, Location, Tasks, Status, and Actions |
| Status Toggling  | Toggle cameras between Active/Inactive                                         |
| Delete Action    | Delete available only if a warning exists                                      |
| Filters & Search | Real-time filtering by location/status, and camera ID/name                     |
| Pagination       | Navigate easily across large data sets                                         |

---

## 💡 Inspiration

This project was developed as a submission for **Wobot.ai's Frontend Challenge**. It showcases:

* Practical state management
* Conditional rendering based on screen size
* Tailwind-based component styling
* Reusable UI components

---

## 📬 Contact

Made with ❤️ by [Prateek Rajput](https://prateek-rajput-portfolio.vercel.app)
📧 Email: [prateekrajput475@gmail.com](mailto:prateekrajput475@gmail.com)
🐙 GitHub: [@Prateek-rajput-007](https://github.com/Prateek-rajput-007)
