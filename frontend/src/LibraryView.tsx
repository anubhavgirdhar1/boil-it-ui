import { useState, useMemo, useEffect } from 'react';
import { Template } from './types';
import TemplateCard from './TemplateCard';
import Confirm from './Confirm';
import { Library, Plus, X, Tags } from 'lucide-react';
import * as api from './api';

interface Props {
  templates: Template[];
  onDeleteTemplate: (id: string) => void;
  onRenameTemplate: (id: string, newName: string, tags: string[]) => void;
  onSelectTemplate: (template: Template) => void;
  onLoadToBuilder: (template: Template) => void;
}

export default function LibraryView({ templates, onDeleteTemplate, onRenameTemplate, onSelectTemplate, onLoadToBuilder }: Props) {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [filterTag, setFilterTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [confirmDeleteTag, setConfirmDeleteTag] = useState<string | null>(null);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const tags = await api.getAllTags();
    setAvailableTags(tags);
  };

  const handleAddTag = async () => {
    if (newTag.trim() && !availableTags.includes(newTag.trim())) {
      await api.addTag(newTag.trim());
      await loadTags();
      setNewTag('');
    }
  };

  const handleDeleteTag = (tag: string) => {
    setConfirmDeleteTag(tag);
  };

  const confirmDelete = async () => {
    if (confirmDeleteTag) {
      await api.deleteTag(confirmDeleteTag);
      await loadTags();
      if (filterTag === confirmDeleteTag) setFilterTag('');
      setConfirmDeleteTag(null);
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = templates;
    if (filterTag) {
      result = result.filter(t => t.tags.includes(filterTag));
    }
    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [templates, filterTag, sortBy]);

  return (
    <div className="library-view">
      <div className="library-header">
        <Library size={18} />
        <h2 className="library-title">Template Library</h2>
        <span className="library-count">{templates.length} templates</span>
      </div>

      <div className="library-controls">
        <div className="tag-manager">
          <Tags size={14} />
          <span className="control-label">Manage Tags:</span>
          <div className="tag-input-group">
            <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()} className="text-input" placeholder="New tag" />
            <button onClick={handleAddTag} className="add-tag-btn"><Plus size={14} /></button>
          </div>
          <div className="tag-list">
            {availableTags.map(tag => (
              <span key={tag} className="tag-chip">
                {tag}
                <button onClick={() => handleDeleteTag(tag)} className="tag-remove"><X size={10} /></button>
              </span>
            ))}
          </div>
        </div>

        <div className="library-filters">
          <div className="filter-group">
            <label className="control-label">Filter by Tag:</label>
            <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="select-input">
              <option value="">All Templates</option>
              {availableTags.map(tag => (<option key={tag} value={tag}>{tag}</option>))}
            </select>
          </div>
          <div className="filter-group">
            <label className="control-label">Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'date')} className="select-input">
              <option value="date">Date (Newest First)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="library-empty">
          <p>{filterTag ? `No templates found with tag "${filterTag}"` : 'No templates yet. Forge your first template!'}</p>
        </div>
      ) : (
        <div className="library-grid">
          {filteredAndSorted.map(template => (
            <TemplateCard key={template.id} template={template} onDelete={onDeleteTemplate}
              onRename={onRenameTemplate} onClick={onSelectTemplate} onLoad={onLoadToBuilder} />
          ))}
        </div>
      )}

      {confirmDeleteTag && (
        <Confirm
          message={`Delete tag "${confirmDeleteTag}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteTag(null)}
        />
      )}
    </div>
  );
}
