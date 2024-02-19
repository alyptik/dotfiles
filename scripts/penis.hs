module Quad where

(@==>) :: (Double, Double, Double) -> Double -> String
(a, b, c) @==> d
  | disc (a, b, c - d) < 0 = "TODO: ADD COMPLEX ROOTS SUPPORT"
  | disc (a, b, c - d) == 0 = "x = " ++ show (negate b / (2 * a))
  | otherwise =
    "x1: " ++
    show ((negate b + sqrt (disc (a, b, c - d))) / (2 * a)) ++
    " x2: " ++ show ((negate b - sqrt (disc (a, b, c - d))) / (2 * a))
  where
    disc (x, y, z) = y ** 2 - (4 * x * z)
