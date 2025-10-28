import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add new CSS styles for action icons before </style>
icon_styles = '''        /* Action Icon Buttons */
        .action-icons {
            display: inline-flex;
            gap: 8px;
            align-items: center;
        }

        .action-icon-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 4px;
            transition: all 0.2s ease;
            cursor: pointer;
            text-decoration: none;
            border: 1px solid transparent;
        }

        .action-icon-btn i {
            font-size: 13px;
        }

        .action-icon-btn.view-btn {
            background: #f0f7ff;
            color: #1976d2;
            border-color: #e3f2fd;
        }

        .action-icon-btn.view-btn:hover {
            background: #1976d2;
            color: white;
            border-color: #1976d2;
        }

        .action-icon-btn.edit-btn {
            background: #f1f8f4;
            color: #2e7d32;
            border-color: #e8f5e9;
        }

        .action-icon-btn.edit-btn:hover {
            background: #2e7d32;
            color: white;
            border-color: #2e7d32;
        }

        .action-icon-btn.delete-btn {
            background: #fff5f5;
            color: #d32f2f;
            border-color: #ffebee;
        }

        .action-icon-btn.delete-btn:hover {
            background: #d32f2f;
            color: white;
            border-color: #d32f2f;
        }

        .action-icon-btn.more-btn {
            background: #f5f5f5;
            color: #616161;
            border-color: #eeeeee;
        }

        .action-icon-btn.more-btn:hover {
            background: #616161;
            color: white;
            border-color: #616161;
        }

        .header-effect {
            margin-top: 4px;
        }
'''

content = content.replace('        .header-effect a {\n            margin: 0 5px;\n            cursor: pointer;\n        }\n\n        .header-effect img {\n            transition: transform 0.2s;\n        }\n\n        .header-effect img:hover {\n            transform: scale(1.2);\n        }', icon_styles)

# Replace the icon HTML pattern - first occurrence with dropdown
old_pattern_with_dropdown = '''                                    <p class="header-effect">\n                                        <a onclick="toggleViews(1)" data-bs-toggle="tooltip" data-bs-title="view">\n                                            <i class="fa fa-eye" style="font-size: 15px; color: #007bff;"></i>\n                                        </a>\n                                        <a href="#" data-bs-toggle="tooltip" data-bs-title="edit">\n                                            <i class="fa fa-edit" style="font-size: 15px; color: #28a745;"></i>\n                                        </a>\n                                        <a href="#" data-bs-toggle="tooltip" data-bs-title="delete">\n                                            <i class="fa fa-trash" style="font-size: 15px; color: #dc3545;"></i>\n                                        </a>\n                                    </p>\n                                    <div class="dropdown">\n                                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" id="three-dots">\n                                            <i class="fa fa-ellipsis-v" style="font-size: 15px;" data-bs-toggle="tooltip" data-bs-title="more"></i>\n                                        </button>'''

new_pattern_with_dropdown = '''                                    <div class="header-effect">\n                                        <div class="action-icons">\n                                            <a href="#" class="action-icon-btn view-btn" onclick="toggleViews(1)" data-bs-toggle="tooltip" data-bs-title="View">\n                                                <i class="fa fa-eye"></i>\n                                            </a>\n                                            <a href="#" class="action-icon-btn edit-btn" data-bs-toggle="tooltip" data-bs-title="Edit">\n                                                <i class="fa fa-edit"></i>\n                                            </a>\n                                            <a href="#" class="action-icon-btn delete-btn" data-bs-toggle="tooltip" data-bs-title="Delete">\n                                                <i class="fa fa-trash"></i>\n                                            </a>\n                                            <div class="dropdown" style="display: inline-block;">\n                                                <button type="button" class="action-icon-btn more-btn" data-bs-toggle="dropdown" aria-expanded="false" data-bs-toggle="tooltip" data-bs-title="More">\n                                                    <i class="fa fa-ellipsis-v"></i>\n                                                </button>'''

content = content.replace(old_pattern_with_dropdown, new_pattern_with_dropdown)

# Replace pattern without dropdown (for rows without dropdown)
old_pattern_no_dropdown = '''                                    <p class="header-effect">\n                                        <a onclick="toggleViews(1)" data-bs-toggle="tooltip" data-bs-title="view">\n                                            <i class="fa fa-eye" style="font-size: 15px; color: #007bff;"></i>\n                                        </a>\n                                        <a href="#" data-bs-toggle="tooltip" data-bs-title="edit">\n                                            <i class="fa fa-edit" style="font-size: 15px; color: #28a745;"></i>\n                                        </a>\n                                        <a href="#" data-bs-toggle="tooltip" data-bs-title="delete">\n                                            <i class="fa fa-trash" style="font-size: 15px; color: #dc3545;"></i>\n                                        </a>\n                                    </p>'''

new_pattern_no_dropdown = '''                                    <div class="header-effect">\n                                        <div class="action-icons">\n                                            <a href="#" class="action-icon-btn view-btn" onclick="toggleViews(1)" data-bs-toggle="tooltip" data-bs-title="View">\n                                                <i class="fa fa-eye"></i>\n                                            </a>\n                                            <a href="#" class="action-icon-btn edit-btn" data-bs-toggle="tooltip" data-bs-title="Edit">\n                                                <i class="fa fa-edit"></i>\n                                            </a>\n                                            <a href="#" class="action-icon-btn delete-btn" data-bs-toggle="tooltip" data-bs-title="Delete">\n                                                <i class="fa fa-trash"></i>\n                                            </a>\n                                        </div>\n                                    </div>'''

content = content.replace(old_pattern_no_dropdown, new_pattern_no_dropdown)

# Fix closing div tags
content = content.replace('                                        </ul>\n                                    </div>\n                                </td>', '                                                </ul>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </td>')

# Write the updated content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Successfully updated action icons with clean, professional design!")
print("   - Styled icon buttons with hover effects")
print("   - Color-coded actions (blue=view, green=edit, red=delete, gray=more)")
print("   - Consistent spacing and alignment")
print("   - Better visual hierarchy")
