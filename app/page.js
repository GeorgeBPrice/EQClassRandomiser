import RandomiserCard from "./components/RandomiserCard";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-orange-400 to-white bg-clip-text text-transparent"
          style={{
            textShadow:
              "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)",
          }}
        >
          ⚔️ EQ Class Randomiser ⚔️
        </h1>
        <RandomiserCard />
      </div>
    </main>
  );
}
