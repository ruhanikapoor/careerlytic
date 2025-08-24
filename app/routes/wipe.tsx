import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <main className="bg-[url('/images/spectrum-gradient.svg')] bg-cover bg-center flex items-center justify-center min-h-screen">
  <div className="p-6 bg-[#0A131B]/90 rounded-lg shadow-xl border border-gray-700 w-full max-w-md backdrop-blur-md">
    <h2 className="text-xl font-semibold text-white mb-4">
      Authenticated as: {auth.user?.username}
    </h2>

    <div className="text-gray-300 mb-2">Existing files:</div>
    <div className="flex flex-col gap-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
        >
          <p className="text-white">{file.name}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 flex justify-end">
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition cursor-pointer"
        onClick={() => handleDelete()}
      >
        Wipe App Data
      </button>
    </div>
  </div>
</main>
  );
};

export default WipeApp;
