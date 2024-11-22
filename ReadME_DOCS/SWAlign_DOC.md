# iCn3D Smith-Waterman Alignment Feature Documentation  

## Overview  
The **Smith-Waterman Alignment** feature in iCn3D enables precise alignment of a target sequence to a query sequence, returning an aligned sequence visualization. This feature supports both **local** and **global** alignment, allowing users to choose the most suitable method based on their research needs. The implementation is adapted from the [bioseq.js library](https://github.com/lh3/bioseq-js/blob/master/bioseq.js), ensuring high performance and reliable alignment computations.  

### Implementation  
The Smith-Waterman Alignment feature integrates the **bioseq.js** library with iCn3D’s sequence and annotation functionalities, enabling dynamic visualization of aligned and highlighted results. Key adaptations include:  
- Modifications to the `bsa_align` function to enhance compatibility with iCn3D.  
- Development of a custom `bsa_cigar_to_string` function for translating alignment results into a user-friendly format.  

This integration ensures seamless alignment display within iCn3D, where sequence matches are highlighted and mapped directly onto 3D molecular structures.  

---

## Accessing the Smith-Waterman Alignment Feature  

To perform a sequence alignment:  
1. Navigate to the menu bar at the top of the iCn3D interface.  
2. Click **File**.  
3. Select **Align**.  
4. Choose **Sequence to Structure** from the dropdown menu.  

---

## Alignment Options  

### **Local Alignment**  
- Focuses on finding the best matching subsequence between the target and query.  
- Ideal for comparing sequences with partial similarities or identifying conserved regions.  

### **Global Alignment**  
- Performs a comprehensive alignment of the entire target and query sequences.  
- Useful for comparing full-length sequences or evaluating overall sequence similarity.  

---

## Input Requirements  

1. **Target Sequence**  
   - A sequence extracted from a loaded molecular structure in iCn3D or provided by the user.  

2. **Query Sequence**  
   - A user-defined sequence in standard formats such as plain text or FASTA.  

---

## Using the Alignment Feature  

### Step-by-Step Instructions  
1. **Open the Dialog**:  
   Select **File -> Align -> Sequence to Structure** to launch the alignment dialog box.  

2. **Input Sequences**:  
    - Enter the **Query Sequence** in the input box or upload a FASTA file. 
   - Choose the **Target Sequence** from the loaded structure or upload it manually.  

3. **Select Alignment Type**:  
   - Choose between **Local** or **Global** alignment based on your research objective.  


4. **View Results**:  
   - Aligned sequences will be displayed alongside the structure.  
   - Matching residues and gaps are highlighted, with mapped residues shown directly on the 3D structure for easy interpretation.  

---

## Feature Highlights  

- **Dynamic Visualization**:  
  - Alignment results are mapped to the molecular structure, allowing users to correlate sequence alignment with structural features.  

- **Flexible Input**:  
  - Accepts sequences in multiple formats and integrates seamlessly with existing structure data in iCn3D.  

- **Customizable Options**:  
  - Provides both local and global alignment methods, accommodating diverse research needs.  

- **High Performance**:  
  - Built on the optimized algorithms from [bioseq.js](https://github.com/lh3/bioseq-js/blob/master/bioseq.js).  

---

## Example Use Cases  

1. **Identifying Conserved Regions**  
   - Use local alignment to identify conserved subsequences in homologous proteins or nucleic acids.  

2. **Evaluating Sequence Similarity**  
   - Perform global alignment to compare a query sequence against a known structure's sequence.  

3. **Mapping Functional Sites**  
   - Align a query sequence to map functional or evolutionary motifs onto a 3D structure.  

---

## Troubleshooting  

1. **Alignment Errors**:  
   - Ensure that both the target and query sequences are in valid formats.  
   - Check for unsupported characters or improperly formatted FASTA files.  

2. **Slow Performance**:  
   - For very long sequences, allow additional processing time.  
   - Ensure your system meets the recommended hardware requirements for iCn3D.  

3. **Misaligned Residues**:  
   - Verify that the target sequence corresponds to the loaded structure.  
   - Reevaluate the alignment type (local vs. global) for suitability.  

---

## Conclusion  

The **Smith-Waterman Alignment** feature in iCn3D enhances sequence-to-structure analysis by providing precise alignment capabilities. Its integration with 3D molecular visualization makes it an invaluable tool for researchers investigating sequence-function relationships, structural conservation, and protein or nucleic acid interactions.  
