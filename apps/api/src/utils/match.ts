import { JaroWinklerDistance } from 'natural'

// https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
export const calcMatchScore = (s1: string, s2: string) => JaroWinklerDistance(s1, s2, { ignoreCase: true })
