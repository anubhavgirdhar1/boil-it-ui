import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import * as api from './api';

interface Props {
  onClose: () => void;
  onSave: (name: string, tags: string[]) => void;
}

export default function ForgeModal({ onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const tags = await api.getAllTags();
    setAvailableTags(tags);
  };

  const handleAddTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    e.target.value = '';
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), selectedTags);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Forge Template</h2>
          <button onClick={onClose} className="icon-btn">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div className="field-group">
            <label className="field-label">Template Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-input"
              placeholder="my-template"
              autoFocus
            />
          </div>

          <div className="field-group">
            <label className="field-label">Tags</label>
            {availableTags.length === 0 ? (
              <p className="text-muted">No tags available. Create tags in the Library view first.</p>
            ) : (
              <>
                <select onChange={handleAddTag} className="text-input" defaultValue="">
                  <option value="" disabled>Select a tag...</option>
                  {availableTags
                    .filter(tag => !selectedTags.includes(tag))
                    .map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
                {selectedTags.length > 0 && (
                  <div className="tag-list">
                    {selectedTags.map(tag => (
                      <span key={tag} className="tag-chip">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="tag-remove">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="secondary-btn">Cancel</button>
          <button onClick={handleSave} className="primary-btn">Save Template</button>
        </div>
      </div>
    </div>
  );
}
