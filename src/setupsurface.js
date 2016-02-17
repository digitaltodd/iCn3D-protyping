/*! setupsurface.js from SurfaceWorker.js
 * @author David Koes  / https://github.com/3dmol/3Dmol.js/tree/master/3Dmol
 * Modified by Jiyao Wang / https://github.com/ncbi/icn3d
 */

$3Dmol.SetupSurface = function (data) {
    var me = this;

    //var $3Dmol = $3Dmol || {};

    //var vol = $3Dmol.volume(data.extent);
    var vol = undefined;

    var ps = new $3Dmol.ProteinSurface();
    ps.initparm(data.extent, (data.type === 1) ? false : true, vol);

    ps.fillvoxels(data.allatoms, data.extendedAtoms);

    ps.buildboundary();

    //if (data.type === 4 || data.type === 2) {
    if (data.type === 2) {
        ps.fastdistancemap();
        ps.boundingatom(false);
        ps.fillvoxelswaals(data.allatoms, data.extendedAtoms);
    }

    ps.marchingcube(data.type);

    ps.vpBits = null; // uint8 array of bitmasks
    ps.vpDistance = null; // floatarray of _squared_ distances
    ps.vpAtomID = null; // intarray
    ps.faces = null;
    ps.verts = null;

    return ps.getFacesAndVertices(data.atomsToShow);
};

