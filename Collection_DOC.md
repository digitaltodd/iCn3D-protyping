# iCn3D Collections Feature Documentation  

## Overview  
The **Collections** feature in iCn3D allows users to open and visualize multiple molecular structures or annotations simultaneously. By supporting various file formats—including PDB, JSON, ZIP, and GZ—it provides a robust tool for managing and analyzing complex datasets. Additionally, command annotations are now preserved and can be reimported when exporting a collection JSON, streamlining workflows for iterative analyses.  
### Implementation  

The **Collections** feature is implemented in the `SelectCollections` class, which handles data organization, UI integration, and event management. Key aspects of the implementation include:  

1. **Dynamic Data Management**:  
   - Tracks and manages data for multiple structures and their annotations.  
   - Differentiates between previously loaded and newly added structures using the `dictionaryDifference` method.  

2. **Integration with User Interface (UI)**:  
   - The **collections menu** dynamically updates with loaded datasets and structures using the `setAtomMenu` function.  
   - The `clickStructure` function listens for menu changes, updates the current structure, and applies associated commands.  

3. **Event Handling**:  
   - Implements focus and change event listeners to handle user interactions with the collections menu efficiently.  

4. **File Loading and Parsing**:  
   - Supports loading data from different file formats, using `pdbParserCls.loadPdbData` and `chainalignParserCls.downloadMmdbAf`.  
   - Applies stored commands to ensure consistency with the loaded dataset.  

5. **Command Execution**:  
   - Reapplies stored commands for each dataset, ensuring that custom annotations and selections persist across sessions.  

---

## Accessing the Collections Feature  

To use the Collections feature:  
1. Navigate to the menu bar at the top of the iCn3D interface.  
2. Click **File**.  
3. Select **Open File**, then choose **Collection File** from the dropdown menu.  

---

## Supported File Formats  

1. **PDB (Protein Data Bank)**: Standard format for 3D coordinates of biological macromolecules.  
2. **JSON (JavaScript Object Notation)**: Includes structural data and annotations.  
3. **ZIP**: A compressed file format that may contain:  
   - JSON files.  
   - PDB files.
   - GZ files.
   - A combination of JSON and PDB files.  
4. **GZ (Gzip Compressed Files)**: Compressed single-file datasets.  

---

## Loading a Collection File  

### Open the Dialog  
- Upon selecting **Collection File**, a dialog box will appear for file browsing.  

### Choose File  
- Click **Choose File** to locate your collection file in one of the supported formats on your computer.  

### Example Files  
- A link in the dialog box provides access to example files for users new to the feature. These files illustrate correct formatting and structure for creating collections.  

### Load File  
- After selecting the file, click **Open**. iCn3D will parse the file, load the molecular structures, annotations, and preserved command annotations into the viewer.  

---

## New Functionalities  

- **Enhanced File Support**:  
  - Ability to load ZIP files with combinations of JSON and PDB files, JSON-only content, or GZ-only content.  
  - Support for GZ files for single compressed datasets.  

- **Command Annotation Management**:  
  - Command annotations are now stored with the collection data.  
  - When exporting a collection JSON, these annotations are preserved and can be reimported for seamless workflows.  

---

## Example Use Cases  

1. **Comparative Structural Analysis**  
   Load multiple PDB files to visually compare different protein structures or conformations.  

2. **Detailed Annotation Loading**  
   Use JSON files to import rich annotations tied to molecular structures for better insight into functional regions or interactions.  

3. **Batch Processing**  
   ZIP and GZ file support enables the simultaneous loading of multiple datasets, saving time and ensuring efficient project management.  

4. **Iterative Analysis**  
   Reimport command annotations to continue or modify prior analyses without needing to recreate workflows.  

---

## Troubleshooting  

1. **File Format Errors**  
   - Ensure files are in a supported format (PDB, JSON, ZIP, or GZ).  
   - Verify the integrity of files to prevent loading issues.  

2. **Incomplete Loading**  
   - Large or complex datasets may require additional time to process.  
   - Confirm that your system meets the recommended hardware requirements for iCn3D.  

3. **Example File Access**  
   - If example file links are inaccessible, check your internet connection or contact support.  

---

## Conclusion  

The enhanced **Collections** feature in iCn3D simplifies the management and visualization of multiple molecular datasets. With expanded file format support and the ability to preserve and reimport command annotations, this feature provides researchers with a powerful tool for structural analysis, comparative studies, and workflow optimization.  
