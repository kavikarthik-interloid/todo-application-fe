export const getTodo = async () => {
  const response = await fetch(
    "https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos?page=1&limit=20&sort_by=created_at&sort_order=desc",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    },
  );
  if (!response.ok) {
    throw new Error("failed to get data");
  }
  const getData = await response.json();
  // console.log(getData)
  return getData;
};
