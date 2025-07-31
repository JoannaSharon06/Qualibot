import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import './SolutionPage.css';

const SolutionPage = () => {
  const [solutions, setSolutions] = useState([]);
  const [editingSolution, setEditingSolution] = useState(null);
  const [formData, setFormData] = useState({
    personName: '',
    problem: '',
    solution: '',
    when: ''
  });

  useEffect(() => {
    fetch('https://qualibot.onrender.com/api/solutions')
      .then(res => res.json())
      .then(data => setSolutions(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://qualibot.onrender.com/api/solutions/${id}`, { method: 'DELETE' });
    setSolutions(solutions.filter(sol => sol._id !== id));
  };

  const handleEdit = (solution) => {
    setEditingSolution(solution);
    setFormData({
      personName: solution["person name"],
      problem: solution.problem,
      solution: solution.solution,
      when: solution.when
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const res = await fetch(`https://qualibot.onrender.com/api/solutions/${editingSolution._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const updated = await res.json();
      setSolutions(solutions.map(sol => sol._id === updated._id ? updated : sol));
      setEditingSolution(null);
    } else {
      alert('Update failed');
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="solution-container">
        <h2 className="solution-heading">Solution Management</h2>
        {solutions.map((sol) => (
          <div className="solution-card" key={sol._id}>
            <h3>{sol.title}</h3>
            <p><strong>Person:</strong> {sol["person name"]}</p>
            <p><strong>Defect:</strong> {sol.problem}</p>
            <p><strong>Solution:</strong> {sol.solution}</p>
            <p><strong>Date:</strong> {sol.when}</p>
            <div className="solution-actions">
              <button onClick={() => handleEdit(sol)}>Edit</button>
              <button onClick={() => handleDelete(sol._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingSolution && (
        <div className="edit-modal">
          <div className="edit-form">
            <h3>Edit Solution</h3>
            <input name="personName" value={formData.personName} onChange={handleChange} placeholder="Person Name" />
            <input name="problem" value={formData.problem} onChange={handleChange} placeholder="Problem" />
            <input name="solution" value={formData.solution} onChange={handleChange} placeholder="Solution"/>
            <input name="when" value={formData.when} onChange={handleChange} placeholder="Date" />
            <div className="modal-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingSolution(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionPage;
