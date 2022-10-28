# Collections in iCn3D

## V1 Getting started
### V1.0 read a list, display structure on click
1.	First step read in a file of PDB IDs with metadata
a.	PDB ID
b.	Title
2.	Display titles in a window, “Structure Collection”
3.	Clicking a title displays the structure
4.	The first title is loaded by default
Structures are loaded into iCn3D from NCBI as if an ID is used as the input: File > Retrieve by ID. MMDB files are initially preferred (default)
Requires a new menu item. Add to Analysis > Collection (dimmed if there is no collection). Add collection under defined sets. 
V1.1 The structure to be used is defined in the collection file – PDB vs MMDB
V1.2 align structures – add check boxes, or shift clicks to select multiple structures

 

Modifications – 10/28 meeting.
JSON file: 
•	change “filename:” to “pdbid:”  
•	strip the .cn3 extension
Preload all structures and hide. Alternatively we can show the first structure and indicate in the collections window that it is showing. 

