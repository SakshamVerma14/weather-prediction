// src/components/BackButton.tsx
export default function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="fixed top-6 left-6 z-50 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-lg"
    >
      ⬅ Back
    </button>
  );
}
