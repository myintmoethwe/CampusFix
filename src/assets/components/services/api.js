const API_URL = "http://localhost:5000";

export const getMyIssues = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/issues/my`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch issues");
  }

  return await response.json();
};
