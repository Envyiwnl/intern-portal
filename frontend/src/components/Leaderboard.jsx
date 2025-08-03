export default function Leaderboard({ data = [] }) {
  return (
    <div className="flex items-center justify-center">
      <section className="p-4 bg-blue-50/30 rounded-xl shadow-xl backdrop-blur-md w-[400px]">
        <h2 className="text-2xl mb-3">Leaderboard</h2>

        {data.length > 0 ? (
          <ol className="list-decimal pl-5">
            {data.map((p, i) => (
              <li key={i}>
                {p.name}: ₹{p.raised}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">
            {data.length === 0 ? "No entries yet." : "Loading…"}
          </p>
        )}
      </section>
    </div>
  );
}