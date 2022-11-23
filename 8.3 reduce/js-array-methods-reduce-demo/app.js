// const planets = [
// 	{
// 		name            : 'Alderaan',
// 		rotation_period : 24,
// 		orbital_period  : 364,
// 		diameter        : 12500,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'grasslands, mountains',
// 		surface_water   : 40,
// 		population      : 2000000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/5/',
// 			'https://swapi.dev/api/people/68/',
// 			'https://swapi.dev/api/people/81/'
// 		],
// 		films           : [
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/1/'
// 		],
// 		created         : '2014-12-10T11:35:48.479000Z',
// 		edited          : '2014-12-20T20:58:18.420000Z',
// 		url             : 'https://swapi.dev/api/planets/2/'
// 	},
// 	{
// 		name            : 'Yavin IV',
// 		rotation_period : 24,
// 		orbital_period  : 4818,
// 		diameter        : 10200,
// 		climate         : 'temperate, tropical',
// 		gravity         : '1 standard',
// 		terrain         : 'jungle, rainforests',
// 		surface_water   : 8,
// 		population      : 1000,
// 		residents       : [],
// 		films           : [ 'https://swapi.dev/api/films/1/' ],
// 		created         : '2014-12-10T11:37:19.144000Z',
// 		edited          : '2014-12-20T20:58:18.421000Z',
// 		url             : 'https://swapi.dev/api/planets/3/'
// 	},
// 	{
// 		name            : 'Hoth',
// 		rotation_period : 23,
// 		orbital_period  : 549,
// 		diameter        : 7200,
// 		climate         : 'frozen',
// 		gravity         : '1.1 standard',
// 		terrain         : 'tundra, ice caves, mountain ranges',
// 		surface_water   : 100,
// 		population      : 'unknown',
// 		residents       : [],
// 		films           : [ 'https://swapi.dev/api/films/2/' ],
// 		created         : '2014-12-10T11:39:13.934000Z',
// 		edited          : '2014-12-20T20:58:18.423000Z',
// 		url             : 'https://swapi.dev/api/planets/4/'
// 	},
// 	{
// 		name            : 'Dagobah',
// 		rotation_period : 23,
// 		orbital_period  : 341,
// 		diameter        : 8900,
// 		climate         : 'murky',
// 		gravity         : 'N/A',
// 		terrain         : 'swamp, jungles',
// 		surface_water   : 8,
// 		population      : 'unknown',
// 		residents       : [],
// 		films           : [
// 			'https://swapi.dev/api/films/2/',
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/3/'
// 		],
// 		created         : '2014-12-10T11:42:22.590000Z',
// 		edited          : '2014-12-20T20:58:18.425000Z',
// 		url             : 'https://swapi.dev/api/planets/5/'
// 	},
// 	{
// 		name            : 'Bespin',
// 		rotation_period : 12,
// 		orbital_period  : 5111,
// 		diameter        : 118000,
// 		climate         : 'temperate',
// 		gravity         : '1.5 (surface), 1 standard (Cloud City)',
// 		terrain         : 'gas giant',
// 		surface_water   : 0,
// 		population      : 6000000,
// 		residents       : [ 'https://swapi.dev/api/people/26/' ],
// 		films           : [ 'https://swapi.dev/api/films/2/' ],
// 		created         : '2014-12-10T11:43:55.240000Z',
// 		edited          : '2014-12-20T20:58:18.427000Z',
// 		url             : 'https://swapi.dev/api/planets/6/'
// 	},
// 	{
// 		name            : 'Endor',
// 		rotation_period : 18,
// 		orbital_period  : 402,
// 		diameter        : 4900,
// 		climate         : 'temperate',
// 		gravity         : '0.85 standard',
// 		terrain         : 'forests, mountains, lakes',
// 		surface_water   : 8,
// 		population      : 30000000,
// 		residents       : [ 'https://swapi.dev/api/people/30/' ],
// 		films           : [ 'https://swapi.dev/api/films/3/' ],
// 		created         : '2014-12-10T11:50:29.349000Z',
// 		edited          : '2014-12-20T20:58:18.429000Z',
// 		url             : 'https://swapi.dev/api/planets/7/'
// 	},
// 	{
// 		name            : 'Naboo',
// 		rotation_period : 26,
// 		orbital_period  : 312,
// 		diameter        : 12120,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'grassy hills, swamps, forests, mountains',
// 		surface_water   : 12,
// 		population      : 4500000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/3/',
// 			'https://swapi.dev/api/people/21/',
// 			'https://swapi.dev/api/people/36/',
// 			'https://swapi.dev/api/people/37/',
// 			'https://swapi.dev/api/people/38/',
// 			'https://swapi.dev/api/people/39/',
// 			'https://swapi.dev/api/people/42/',
// 			'https://swapi.dev/api/people/60/',
// 			'https://swapi.dev/api/people/61/',
// 			'https://swapi.dev/api/people/66/',
// 			'https://swapi.dev/api/people/35/'
// 		],
// 		films           : [
// 			'https://swapi.dev/api/films/5/',
// 			'https://swapi.dev/api/films/4/',
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/3/'
// 		],
// 		created         : '2014-12-10T11:52:31.066000Z',
// 		edited          : '2014-12-20T20:58:18.430000Z',
// 		url             : 'https://swapi.dev/api/planets/8/'
// 	},
// 	{
// 		name            : 'Coruscant',
// 		rotation_period : 24,
// 		orbital_period  : 368,
// 		diameter        : 12240,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'cityscape, mountains',
// 		surface_water   : 'unknown',
// 		population      : 1000000000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/34/',
// 			'https://swapi.dev/api/people/55/',
// 			'https://swapi.dev/api/people/74/'
// 		],
// 		films           : [
// 			'https://swapi.dev/api/films/5/',
// 			'https://swapi.dev/api/films/4/',
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/3/'
// 		],
// 		created         : '2014-12-10T11:54:13.921000Z',
// 		edited          : '2014-12-20T20:58:18.432000Z',
// 		url             : 'https://swapi.dev/api/planets/9/'
// 	},
// 	{
// 		name            : 'Kamino',
// 		rotation_period : 27,
// 		orbital_period  : 463,
// 		diameter        : 19720,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'ocean',
// 		surface_water   : 100,
// 		population      : 1000000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/22/',
// 			'https://swapi.dev/api/people/72/',
// 			'https://swapi.dev/api/people/73/'
// 		],
// 		films           : [ 'https://swapi.dev/api/films/5/' ],
// 		created         : '2014-12-10T12:45:06.577000Z',
// 		edited          : '2014-12-20T20:58:18.434000Z',
// 		url             : 'https://swapi.dev/api/planets/10/'
// 	},
// 	{
// 		name            : 'Geonosis',
// 		rotation_period : 30,
// 		orbital_period  : 256,
// 		diameter        : 11370,
// 		climate         : 'temperate, arid',
// 		gravity         : '0.9 standard',
// 		terrain         : 'rock, desert, mountain, barren',
// 		surface_water   : 5,
// 		population      : 100000000000,
// 		residents       : [ 'https://swapi.dev/api/people/63/' ],
// 		films           : [ 'https://swapi.dev/api/films/5/' ],
// 		created         : '2014-12-10T12:47:22.350000Z',
// 		edited          : '2014-12-20T20:58:18.437000Z',
// 		url             : 'https://swapi.dev/api/planets/11/'
// 	}
// ];

const nums = [ 20, 30, 50, 12, -2, 45, 99, 19, 22, 85 ];

let total = 0;
for (let num of nums) {
	total += num;
}
console.log(total);

let min = nums[0];
for (let i = 1; i < nums.length; i++) {
	if (nums[i] < min) min = nums[i];
}
console.log(min);

const str = 'lollapalooza';
const charFreq = {};
for (let char of str) {
	if (charFreq[char]) {
		charFreq[char] += 1;
	}
	else {
		charFreq[char] = 1;
	}
}

const words = [ 'hello', 'I', 'love', 'you' ];
const result = words.reduce(function(accum, nextWord) {
	console.log(accum, nextWord);
	return accum + nextWord;
});

const midtermScores = [ 70, 88, 93, 94, 64, 62, 56 ];
const finalsScores = [ 92, 93, 76, 77, 78, 59, 61 ];
// const minScore = midtermScores.reduce(function(min, nextScore) {
// 	if (nextScore < min) {
// 		return nextScore;
// 	}
// 	return min;
// });

const minMidtermScore = midtermScores.reduce(function(min, nextScore) {
	return nextScore < min ? nextScore : min;
});
const maxScore = midtermScores.reduce(function(max, nextScore) {
	return nextScore > max ? nextScore : max;
});

// const minFinalsScore = finalsScores.reduce(function(min, nextScore) {
// 	return nextScore < min ? nextScore : min;
// });
const minOverallScore = finalsScores.reduce(function(min, nextScore) {
	return nextScore < min ? nextScore : min;
}, minMidtermScore);
