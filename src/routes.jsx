import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserLayout from "./layouts/user/UserLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import {
  AdminSettings,
  ManageQuestionnaires,
  ManageUsersPage,
  MessagesPage,
  UserView,
} from "./pages/admin";
import {
  Dashboard,
  ResourcesPage,
  UserSettings,
  PHQ9Page,
  GAD7Page,
  ResultPage,
} from "./pages/user";
import PageNotFound from "./utils/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user/:id/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/user/:id/resources",
        element: <ResourcesPage />,
      },

      {
        path: "/user/:id/settings",
        element: <UserSettings />,
      },
      {
        path: "/user/:id/phq9",
        element: <PHQ9Page />,
      },
      {
        path: "/user/:id/gad7",
        element: <GAD7Page />,
      },
    ],
  },

  {
    path: "/session",
    element: <UserLayout />,
    children: [
      {
        path: "/session/:id/phq9",
        element: <PHQ9Page />,
      },
      {
        path: "/session/:id/gad7",
        element: <GAD7Page />,
      },
      {
        path: "/session/:id/result",
        element: <ResultPage />,
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
        path: "/admin/manageUsers/:id",
        element: <UserView />,
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
    ],
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);
