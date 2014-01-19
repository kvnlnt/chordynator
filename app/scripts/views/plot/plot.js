/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg',
    'views/plot/bg',
    'views/plot/chord_note',
    'views/plot/chord_type',
    'views/plot/contact',
    'views/plot/lead'
], function ($, _, Backbone, SVGview, PlotBGview, PlotChordNote, PlotChordType, PlotContactView, PlotLeadView) {
    'use strict';

    var PlotView = SVGview.extend({

        tagName:'g',

        attributes:function(){

            var attrs = {
                class:this.model.get('class'),
                plot:this.model.plot.id,
                group:this.model.plot.group || '',
                transform:'translate('+this.model.plot.x+','+this.model.plot.y+')'
            };

            return attrs;

        },

        initialize:function(){

            // register pubs
            this.pubs();

            // register subs
            this.subs();

            // render
            this.render();
            
        },

        events:function(){

            // register event object
            var e = {
                'dblclick'  : 'plotMenu',
                'click'     : 'plotClicked'
            };

            // return event object
            return e;

        },

        pubs:function(){

            // events to listen for
            this.model.pubs = {
                plotClicked: this.model.plat.model.id + ':plot:clicked'
            };

        },

        subs:function(){

            // subs
            Backbone.pubSub.on('plat:destroy', this.close, this);

        },

        close:function(id){

            // remove this view
            if(this.model.plat.id == id) this.remove(); 

        },

        plotMenu:function(e){
            console.log('plot menu');
        },

        plotClicked:function(e){

            // get elements
            var plot = e.currentTarget;
            var plat = $(plot).parents('svg');

            // deactive all plots
            this.deactivateAll(plat);

            // activate
            this.activate(plot, plat);

        },

        deactivateAll:function(plat){

            // deactivations 
            _.each(plat.find('g.active, g.activeLead'), function(p){ p.setAttribute('class', 'plot'); }); // deactivate all active plots
            _.each(plat.find('ellipse.active'), function(c){ c.setAttribute('class', 'contact'); }); // deactivate all contacts

        },

        activate:function(plot, plat){

            // elements          
            var twin = typeof this.model.plot.twin !== 'undefined' ? plat.find('g[plot="'+this.model.plot.twin+'"]')[0] : null; // get twin plot

            // activations
            plot.setAttribute('class', 'plot active'); // activate plot
            if(twin !== null) twin.setAttribute('class', 'plot active'); // activate twin

            // find contacts to activate (leads from plot and leads from twin which need to find itself on the collection chain by id)
            var plotLeads = this.model.plot.leads;
            var twinLeads = twin !== null ? this.model.plat.collection.get(this.model.plot.twin).plot.leads : [];
            var leads     = twin !== null ? plotLeads.concat(twinLeads) : plotLeads;    

            // loop and activate leads
            _.each(leads, function(lead){

                var _lead = plat.find('g[plot="'+lead.plot+'"]')[0];
                if(typeof lead !== 'undefined') _lead.setAttribute('class', 'plot activeLead');

                var _lead_contact = plat.find('g[plot="'+lead.plot+'"] ellipse[pole="'+lead.contact+'"]')[0];
                if(typeof lead !== 'undefined') _lead_contact.setAttribute('class', 'contact active');

            });

        },

        render:function(){

            // model shim to pass in root parent id
            var plat_id = this.model.plat.id;

            // create and attach rect background
            var plotBG = new PlotBGview({ model:{plat:plat_id} });
            this.$el.append(plotBG.render().el);

            // create and attach name text
            var plotChordNote = new PlotChordNote({model:{note: this.model.chord.note, plat:plat_id}});
            this.$el.append(plotChordNote.render().el);

            // create and attach type text
            var plotChordType = new PlotChordType({model:{type: this.model.chord.type, plat:plat_id}});
            this.$el.append(plotChordType.render().el);

            // draw lead lines
            for(var line in this.model.plot.leads){

                var leads = this.model.plot.leads[line];
                var model = { x1:leads.from.x, y1:leads.from.y, x2:leads.to.x, y2:leads.to.y, plat:plat_id };
                var plotLeadView = new PlotLeadView({ model:model });
                this.$el.append(plotLeadView.render().el);

            }

            // loop, create and attach contacts if they exist
            for(var pole in this.model.plot.contact){

                var curr = this.model.plot.contact[pole];

                if(curr.length){

                    var model = { cx:curr[0], cy:curr[1], plat:plat_id, pole:pole, class:'contact' };
                    var plotContact = new PlotContactView({ model:model });
                    this.$el.append(plotContact.render().el);

                }

            }
           
            this.model.plat.$el.append(this.$el);

        }
        
    });

    return PlotView;
});
