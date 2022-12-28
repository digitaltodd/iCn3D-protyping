/**
 * @author Jack Lin <th3linja@yahoo.com> / https://github.com/ncbi/icn3d
 */

 class LegendTable {
     constructor(icn3d) {
         this.icn3d = icn3d;
     }

     showColorLegend(colorType) { let ic = this.icn3d, me = ic.icn3dui;
        let bClose = false;

        let colorLabel = colorType.substr(0, 1).toUpperCase() + colorType.substr(1);
        if(colorType == 'confidence') {
            colorLabel = 'AlphaFold Confidence';
        }
        else if(colorType == 'normalized hydrophobic') {
            colorLabel = 'Normalized Hydrophobicity';
        }
        else if(colorType == 'hydrophobic') {
            colorLabel = 'Hydrophobicity';
        }

        let html = "Color by <b>" + colorLabel + "</b><br><br>";
 
        //if (ic.legendClick == 1){
        if (colorType == 'atom'){  
            let categoryArray = ['proteins', 'nucleotides', 'chemicals', 'ions', 'water'];
            for(let i = 0, il = categoryArray.length; i < il; ++i) {
                let category = categoryArray[i];
                let atomHash = me.hashUtilsCls.intHash(ic[category], ic.hAtoms);
                html += this.getColorLegendForElem(category, atomHash);
            }
        }
        //else if (ic.legendClick == 2){
        else if (colorType == 'residue'){
            html += this.getColorLegendForResidue(ic.hAtoms);
        }
        //else if (ic.legendClick == 3){
        else if (colorType == 'charge'){
            html += this.getColorLegendForCharge(ic.hAtoms);
        }
        //else if (ic.legendClick == 4){
        else if (colorType == 'normalized hydrophobic' || colorType == 'hydrophobic') {
            let bOriResn = true;
            let resSet = this.getRes2color(ic.hAtoms, bOriResn);

            // polar first - most to least
            // create hydrophobic table
            var items = Object.keys(resSet).map(
                //(key) => { return [key, Object.keys(resSet[key])[0]] 
                (key) => { return [key, me.parasCls.hydrophobicValues[key]] 
            });

            // items.sort(
            //     (first, second) => { 
            //         return ((parseInt(second[1].substring(2,4), 16) - parseInt(second[1].substring(4,6), 16)) - (parseInt(first[1].substring(2,4), 16) - parseInt(first[1].substring(4,6), 16)));
            //     }
            // );

            items.sort(
                (first, second) => { 
                    return parseFloat(first[1]) - parseFloat(second[1]);
                }
            );

            var keys = items.map(
                //(e) => { return [e[0], e[1]]
                (e) => { return [e[0], Object.keys(resSet[e[0]])[0]]
            });

            html += "<div>";
            
            if(colorType == 'normalized hydrophobic') {
                html += "Dark green (W, F, Y, L, I, C, M): Hydrophobic<br>";
                html += "Light green (G, V, S, T, A, N, P, Q): Polar<br>";
                html += "Grey: Charged, not hydrophobic<br><br>";
            }
            else {
                html += "Green (W, F, Y, L, I, C, M): Hydrophobic<br>";
                html += "Yellow (G, V, S, T, A, N, P, Q): Polar<br>";
                html += "Red: Negatively Charged<br>";
                html += "Blue: Positively Charged<br><br>";
            }

            let cnt = 0;
            for (let key of keys) {
                if(!me.parasCls.residueAbbrev[key[0]]) continue;

                html += "<div style='display:inline-block; width:100px'>";
                html += "<div style='width: 10px; height: 10px; background-color:#" + key[1] + "; border: 0px;display:inline-block;' ></div> ";
                html +=  me.parasCls.residueAbbrev[key[0]] + "</div>"

                if(cnt % 4 == 3) html += "<br>";

                ++cnt;
            }
            html += "</div>"
        }
        //else if (ic.legendClick == 5){
        else if (colorType == 'b factor') {
            html += "<div style='width:450px'>B factor quantitates the uncertainty for each atom. A high B factor reflects that the position is less certain.</div><br>"
            html += me.htmlCls.clickMenuCls.setLegendHtml();
        }
        //else if (ic.legendClick == 6){
        else if (colorType == 'confidence') {
            html += me.htmlCls.clickMenuCls.setLegendHtml(true);
        }
        else {
            html = '';
            bClose = true;
        }

        $("#" + me.pre + "dl_legend").html(html);
        me.htmlCls.dialogCls.openDlg('dl_legend', 'Color Legend');

        if(bClose) {
            if(window.dialog) window.dialog.dialog( "close" );
        }
     }

     getColorLegendForElem(category, atomHash) { let ic = this.icn3d, me = ic.icn3dui;
        let html = '';
        let elemSet = {};

        for (let serial in atomHash){
            // atom = ic.atoms[Object.keys(atomHash)[k]];
            let atom = ic.atoms[serial];
            let temp = (atom === undefined || atom.color === undefined || atom.color.getHexString().toUpperCase() === 'FFFFFF') ? 'DDDDDD' : atom.color.getHexString();
            if (elemSet[atom.elem] === undefined){
                elemSet[atom.elem] = {};
            }
            elemSet[atom.elem][temp] = 1
        }

        if(Object.keys(elemSet).length > 0) {
            //html += "<button value='" + category + "' display='block'>" + category + "</button><br>";
            html += "<b>" + category + "</b><br>";
            let elemArray = Object.keys(elemSet).sort();
            //for (let k in elemSet) {
            for(let i = 0, il = elemArray.length; i < il; ++i) {
                let k = elemArray[i];

                html += "<span>";
                for (let v in elemSet[k]) {
                    html += "<div style='width: 10px; height: 10px; background-color:#" + v + "; border: 0px;display:inline-block;' ></div> ";
                }
                html +=  me.parasCls.atomnames[k.toUpperCase()] + "</span><br>";
            }
            html += "<br>";
        }

        return html;
     }

     getRes2color(atomHash, bOriResn) { let ic = this.icn3d, me = ic.icn3dui;
        let resSet = {};

        let residueHash = ic.firstAtomObjCls.getResiduesFromAtoms(atomHash);
        for(let resid in residueHash){
            let atomHash = ic.residues[resid];

            let atom = ic.firstAtomObjCls.getFirstAtomObj(atomHash);
            let resiLabel = (bOriResn) ? atom.resn : me.parasCls.residueAbbrev[atom.resn];
            let temp = (atom === undefined || atom.color === undefined || atom.color.getHexString().toUpperCase() === 'FFFFFF') ? 'DDDDDD' : atom.color.getHexString();
            
            if (resiLabel != undefined){
                if (resSet[resiLabel] === undefined){
                    resSet[resiLabel] = {};
                }
                resSet[resiLabel][temp] = 1;
            }
        }

        return resSet;
     }

     getColorLegendForResidue(atomHash) { let ic = this.icn3d, me = ic.icn3dui;
        let html = '';

        let resSet = this.getRes2color(atomHash);

        if(Object.keys(resSet).length > 0) {
            //html += "<button value='" + pdbid + "' display='block'>" + pdbid + "</button><br>";
            html += "<div>"
            let residueArray = Object.keys(resSet).sort();
            //for (let k in resSet) {
            let dnaHtml = '';
            let cnt = 0;
            for(let i = 0, il = residueArray.length; i < il; ++i) {
                let htmlTmp = '';
                let k = residueArray[i];
                htmlTmp += "<div style='display:inline-block; width:100px'>"
                for (let v in resSet[k]) {
                    htmlTmp += "<div style='width: 10px; height: 10px; background-color:#" + v + "; border: 0px;display:inline-block;' ></div> ";
                }
                htmlTmp +=  k + "</div>";

                if(cnt % 4 == 3) htmlTmp += "<br>";

                if(k.indexOf('(') != -1) {
                    html += htmlTmp;
                    ++cnt;
                }
                else{
                    dnaHtml += htmlTmp;
                }
            }

            if(dnaHtml) html += "<br>" + dnaHtml;

            html += "</div>"
        }

        return html;
     }

     getColorLegendForCharge(atomHash) { let ic = this.icn3d, me = ic.icn3dui;
        let html = '';

        let residueHash = ic.firstAtomObjCls.getResiduesFromAtoms(atomHash);

        let chargeHash = {};
        for(let resid in residueHash){
            let atomHash = ic.residues[resid];

            let atom = ic.firstAtomObjCls.getFirstAtomObj(atomHash);
            if(atom.resn == 'ARG' || atom.resn == 'LYS') {
                chargeHash['Positive'] = 1;
            }
            else if(atom.resn == 'HIS') {
                chargeHash['Partial-Positive'] = 1;
            }
            else if(atom.resn == 'ASP' || atom.resn == 'GLU' || ic.nucleotides[atom.serial]) {
                chargeHash['Negative'] = 1;
            }
            else {
                chargeHash['Neutral'] = 1;
            }
        }

        const charge2color = {
            "Positive": "0000ff",
            "Partial-Positive": "8080ff",
            "Negative": "ff0000",
            "Neutral": "888888"
        };

        let chargeOrder = ["Positive", "Partial-Positive", "Negative", "Neutral"]
 
        html += "<div>"
        for (let i = 0, il = chargeOrder.length; i < il; ++i) {
            let charge = chargeOrder[i];
            if (chargeHash[charge]){
                html += "<span>"
                html += "<div style='width: 10px; height: 10px; background-color:#" + charge2color[charge] + "; border: 0px;display:inline-block;' ></div> ";
                html += charge;
                html +=  "</span><br>"
            }
        }
        html += "<br>(Charges are at pH 7)"
        html += "</div>"

        return html;
     }
 }
 
 export {LegendTable}
