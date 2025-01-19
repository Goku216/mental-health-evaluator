import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserLayout from "./layouts/user/UserLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import {
  AdminSettings,
  ManageQuestionnaires,
  ManageUsersPage,
  MessagesPage,
} from "./pages/admin";
import {
  Dashboard,
  ResourcesPage,
  UserSettings,
  PHQ9Page,
  GAD7Page,
} from "./pages/user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user/:id",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "resources",
        element: <ResourcesPage />,
      },
      {
        path: "settings",
        element: <UserSettings />,
      },
      {
        path: "phq9",
        element: <PHQ9Page />,
      },
      {
        path: "gad7",
        element: <GAD7Page />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/manageUsers",
        element: <ManageUsersPage />,
      },
      {
        path: "/admin/manageQuestions",
        element: <ManageQuestionnaires />,
      },
      {
        path: "/admin/messages",
        element: <MessagesPage />,
      },
      {
        path: "/admin/settings",
        element: <AdminSettings />,
      },
      {},
    ],
  },
]);
