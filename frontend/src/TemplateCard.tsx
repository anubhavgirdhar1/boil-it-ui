import { useState, useEffect } from 'react';
import { Template } from './types';
import { Trash2, Edit2, Folder, Download } from 'lucide-react';
import * as api from './api';

interface Props {
  template: Template;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string, tags: string[]) => void;
  onClick: (template: Template) => void;
  onLoad?: (template: Template) => void;
}

export default function TemplateCard({ template, onDelete, onRename, onClick, onLoad }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(template.name);
  const [editTags, setEditTags] = useState<string[]>(template.tags);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await api.getAllTags();
      setAvailableTags(tags);
    };
    if (isEditing) {
      fetchTags();
    }
  }, [isEditing]);

  const handleSave = () => {
    onRename(template.id, editName, editTags);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(template.name);
    setEditTags(template.tags);
    setIsEditing(false);
  };

  const toggleTag = (tag: string) => {
    if (editTags.includes(tag)) {
      setEditTags(editTags.filter(t => t !== tag));
    } else {
      setEditTags([...editTags, tag]);
    }
  };

  return (
    <div className="template-card">
      {isEditing ? (
        <div className="card-edit-mode">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="card-edit-input"
            autoFocus
          />
          <div style={{ marginTop: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '6px' }}>Tags:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '120px', overflowY: 'auto' }}>
              {availableTags.length > 0 ? (
                availableTags.map(tag => (
                  <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={editTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>{tag}</span>
                  </label>
                ))
              ) : (
                <span style={{ fontSize: '11px', color: '#888' }}>No tags available</span>
              )}
            </div>
          </div>
          <div className="card-edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-header" onClick={() => onClick(template)}>
            <Folder size={16} className="card-icon" />
            <h3 className="card-title">{template.name}</h3>
          </div>
          {template.tags.length > 0 && (
            <div className="card-tags">
              {template.tags.map((tag, i) => (
                <span key={i} className="card-tag">{tag}</span>
              ))}
            </div>
          )}
          <div className="card-actions">
            {onLoad && (
              <button onClick={() => onLoad(template)} className="icon-btn" title="Load to Builder">
                <Download size={12} />
              </button>
            )}
            <button onClick={() => setIsEditing(true)} className="icon-btn" title="Rename">
              <Edit2 size={12} />
            </button>
            <button onClick={() => onDelete(template.id)} className="icon-btn" title="Delete">
              <Trash2 size={12} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
