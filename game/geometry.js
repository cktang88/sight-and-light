
// Find intersection of RAY & SEGMENT
function getIntersection(ray,segment){

	// RAY in parametric: Point + Delta*T1
	let r_px = ray.a.x;
	let r_py = ray.a.y;
	let r_dx = ray.b.x-ray.a.x;
	let r_dy = ray.b.y-ray.a.y;

	// SEGMENT in parametric: Point + Delta*T2
	let s_px = segment.a.x;
	let s_py = segment.a.y;
	let s_dx = segment.b.x-segment.a.x;
	let s_dy = segment.b.y-segment.a.y;

	// Are they parallel? If so, no intersect
	let r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
	let s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
	if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
		// Unit vectors are the same.
		return null;
	}

	// SOLVE FOR T1 & T2
	// r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
	// ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
	// ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
	// ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
	let T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
	let T1 = (s_px+s_dx*T2-r_px)/r_dx;

	// Must be within parametic whatevers for RAY/SEGMENT
	if(T1<0) return null;
	if(T2<0 || T2>1) return null;

	// Return the POINT OF INTERSECTION
	return {
		x: r_px+r_dx*T1,
		y: r_py+r_dy*T1,
		param: T1
	};

}

function getSightPolygon(sightX,sightY){

	// Get all unique points
	const points = (segments => {
		let a = [];
		segments.forEach(function(seg){
			a.push(seg.a,seg.b);
		});
		return a;
	})(segments);
	const uniquePoints = [...new Set(points)]; 

	// Get all angles
	const uniqueAngles = [];
	uniquePoints.forEach(uniquePoint => {
		let angle = Math.atan2(uniquePoint.y-sightY,uniquePoint.x-sightX);
		uniquePoint.angle = angle;
		uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
	});

	// RAYS IN ALL DIRECTIONS
	let intersects = [];
	uniqueAngles.forEach(angle => {

		// Calculate dx & dy from angle
		let dx = Math.cos(angle);
		let dy = Math.sin(angle);

		// Ray from center of screen to mouse
		let ray = {
			a:{x:sightX,y:sightY},
			b:{x:sightX+dx,y:sightY+dy}
		};

		// Find CLOSEST intersection
		let closestIntersect = null;
		segments.forEach(segment => {
			let intersect = getIntersection(ray,segment);
			if(!intersect) return;
			if(!closestIntersect || intersect.param<closestIntersect.param){
				closestIntersect=intersect;
			}
		});

		// Intersect angle
		if(!closestIntersect) return;
		closestIntersect.angle = angle;

		// Add to list of intersects
		intersects.push(closestIntersect);

	});

	// Sort intersects by angle
	intersects = intersects.sort((a,b) => {
		return a.angle-b.angle;
	});

	// Polygon is intersects, in order of angle
	return intersects;
}
