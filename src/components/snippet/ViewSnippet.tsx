import { X } from 'lucide-react'; 

function ViewSnippet() {
  return (
    <div className="bg-white p-4 rounded-b shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">tab</h2>
      <button className="text-gray-500 hover:text-gray-700">
        <X size={20} />
      </button>
    </div>
    <p>This is the content for the  tab.</p>
  </div>
  )
}

export default ViewSnippet