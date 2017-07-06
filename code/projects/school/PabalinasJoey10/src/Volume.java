/**
 * Calculates the volume (NOT the area) of
 * three shapes: a sphere, a regular
 * tetrahedron, and a cube, using static
 * methods defined in this file.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 10
 * 06/05/17
 */

import java.util.HashMap;

public class Volume {
	/**
	 * calculates the volumes of
	 * a cube, a regular tetrahedron,
	 * and a sphere.
	 *
 	 * @param side is this side of the shape
  	 * @return the volume of the shape
	 */
	public static HashMap<String, Double> all(Double side) {
		HashMap<String, Double> volumeMap = new HashMap<>();
		volumeMap.put("cube", cube(side));
		volumeMap.put("tetrahedron", tetrahedron(side));
		volumeMap.put("sphere", sphere(side));
		return volumeMap;
	}

	/**
	 * calculates the volumes of a cube
	 *
	 * @param side is this side of the shape
	 * @return the volume of the shape
	 */
	public static double cube(Double side) {
		return Math.pow(side, 3);
	}

	/**
	 * calculates the volumes of a tetrahedron
	 *
	 * @param side is this side of the shape
	 * @return the volume of the shape
	 */
	public static Double tetrahedron(Double side) {
		return Math.pow(side, 3) / (6 * Math.sqrt(2));
	}

	/**
	 * calculates the volumes of a sphere
	 *
	 * @param side is this side of the shape
	 * @return the volume of the shape
	 */
	public static Double sphere(Double side) {
		return (Math.pow(side, 3) * 4 * Math.PI) / 3;
	}
}

