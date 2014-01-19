/*global define*/

define([
    'underscore',
    'backbone',
    'models/plot'
], function (_, Backbone, PlotModel) {
    'use strict';

    var PlatMap = {
            primary:[
                {   
                    id:1, chord:2, x:23, y:23, twin:8, group:1,
                    leads:[{from:{x:15, y:7.5}, to:{x:17, y:7.5}, plot:2, contact:'west' }, {from:{x:15, y:15}, to:{x:17.8, y:17.8}, plot:5, contact:'north' }], 
                    contact:{ north:[7.5, 0], south:[7.5, 15], east:[], west:[0, 7.5] }
                },
                { 
                    id:2, chord:5, x:41, y:23, twin:7, group:2,
                    leads:[{from:{x:15, y:7.5}, to:{x:17, y:7.5}, plot:3, contact:'west' }], 
                    contact:{ north:[7.5, 0], south:[], east:[], west:[0, 7.5] } 
                },
                { 
                    id:3, chord:3, x:59, y:23,
                    leads:[{from:{x:7.5, y:15}, to:{x:7.5, y:17}, plot:6, contact:'north' }],
                    contact:{ north:[7.5, 0], south:[], east:[15, 7.5],  west:[0, 7.5] } 
                },
                { 
                    id:4, chord:6, x:23, y:41, twin:6, group:3,
                    leads:[{from:{x:7.5, y:0}, to:{x:7.5, y:-2}, plot:1, contact:'south' }],
                    contact:{ north:[], south:[7.5, 15], east:[], west:[0, 7.5] } 
                },
                { 
                    id:6, chord:6, x:59, y:41, twin:4, group:3,
                    leads:[{from:{x:7.5, y:15}, to:{x:7.5, y:17}, plot:9, contact:'north' }],
                    contact:{ north:[7.5, 0], south:[], east:[15, 7.5], west:[] } 
                },
                { 
                    id:7, chord:5, x:23, y:59, twin:2, group:2,
                    leads:[{from:{x:7.5, y:0}, to:{x:7.5, y:-2}, plot:4, contact:'south' }, {from:{x:15, y:0}, to:{x:17.8, y:-2.8}, plot:5, contact:'south' }],
                    contact:{ north:[], south:[7.5, 15], east:[15, 7.5], west:[0, 7.5] } 
                },
                { 
                    id:8, chord:2, x:41, y:59, twin:1, group:1,
                    leads:[{from:{x:0, y:7.5}, to:{x:-2, y:7.5}, plot:7, contact:'east' }],
                    contact:{ north:[], south:[7.5, 15], east:[15, 7.5], west:[] } 
                },
                { 
                    id:9, chord:4, x:59, y:59,
                    leads:[{from:{x:0, y:7.5}, to:{x:-2, y:7.5}, plot:8, contact:'east' }, {from:{x:0, y:0}, to:{x:-2.8, y:-2.8}, plot:5, contact:'east' }], 
                    contact:{ north:[7.5, 0], south:[7.5, 15], east:[15, 7.5], west:[] } 
                },
                // render last so lead lines have lower z-index (svg z-index is rendering order)
                { 
                    id:5, chord:1, x:41, y:41, leads:[],
                    contact:{ north:[0, 0], south:[0, 15], east:[15, 15], west:[] } 
                },
            ],
            secondary:[
                { 
                    id:10, chord:1,  x:23, y:5,
                    leads:[{from:{x:7.5, y:15}, to:{x:7.5, y:17}, plot:1, contact:'north' }]
                },
                { 
                    id:11, chord:2,  x:41, y:5,
                    leads:[{from:{x:7.5, y:15}, to:{x:7.5, y:17}, plot:2, contact:'north' }]
                },
                { 
                    id:12, chord:3,  x:59, y:5,
                    leads:[{from:{x:7.5, y:15}, to:{x:7.5, y:17}, plot:3, contact:'north' }]
                },
                { 
                    id:13, chord:4,  x:5,  y:23,
                    leads:[{from:{x:15, y:7.5}, to:{x:17, y:7.5}, plot:1, contact:'west' }]
                },
                { 
                    id:14, chord:5,  x:77, y:23,
                    leads:[{from:{x:0, y:7.5}, to:{x:-2, y:7.5}, plot:3, contact:'east' }] 
                },
                { 
                    id:15, chord:6,  x:5,  y:41,
                    leads:[{from:{x:15, y:7.5}, to:{x:17, y:7.5}, plot:4, contact:'west' }]
                },
                { 
                    id:16, chord:7,  x:77, y:41,
                    leads:[{from:{x:0, y:7.5}, to:{x:-2, y:7.5}, plot:6, contact:'east' }]
                },
                { 
                    id:17, chord:8,  x:5,  y:59,
                    leads:[{from:{x:15, y:7.5}, to:{x:17, y:7.5}, plot:7, contact:'west' }]
                },
                { 
                    id:18, chord:9,  x:77, y:59,
                    leads:[{from:{x:0, y:7.5}, to:{x:-2, y:7.5}, plot:9, contact:'east' }]
                },
                { 
                    id:19, chord:10, x:23, y:77,
                    leads:[{from:{x:7.5, y:0}, to:{x:7.5, y:-2}, plot:7, contact:'south' }]
                },
                { 
                    id:20, chord:11, x:41, y:77,
                    leads:[{from:{x:7.5, y:0}, to:{x:7.5, y:-2}, plot:8, contact:'south' }]
                },
                { 
                    id:21, chord:12, x:59, y:77,
                    leads:[{from:{x:7.5, y:0}, to:{x:7.5, y:-2}, plot:9, contact:'south' }]
                }
            ]
        };

    return PlatMap;
});
