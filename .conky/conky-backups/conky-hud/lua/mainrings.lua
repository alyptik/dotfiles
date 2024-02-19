settings_table = { -- sorted by inner most first
    --[[{ -- SECCOND CLOCK
		name='time',
		arg='%S',
		max=60,
		bg_colour=0x3A3A3A,
		bg_alpha=0.9,
		fg_colour=0x989898,
		fg_alpha=0.9,
		x=320, y=389,
		radius=25,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- MINUTE CLOCK
		name='time',
		arg='%M',
		max=60,
		bg_colour=0x3A3A3A,
		bg_alpha=0.86,
		fg_colour=0x989898,
		fg_alpha=0.86,
		x=320, y=389,
		radius=40,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- HOUR CLOCK
		name='time',
		arg='%H',
		max=24,
		bg_colour=0x3A3A3A,
		bg_alpha=0.82,
		fg_colour=0x989898,
		fg_alpha=0.82,
		x=320, y=389,
		radius=55,
		thickness=10,
		start_angle=270,
		end_angle=360
	},]]
    { -- /dev/sda temp
		name='execi',
		arg='300 nc localhost 7634 | cut -c54-55',
		max=50,
		bg_colour=0x3A3A3A,
		bg_alpha=0.80,
		fg_colour=0x989898,
		fg_alpha=0.80,
		x=320, y=389,
		radius=60,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- gpu temp
		name='hwmon',
		arg='1 temp 1',
		max=70,
		bg_colour=0x3A3A3A,
		bg_alpha=0.75,
		fg_colour=0x989898,
		fg_alpha=0.75,
		x=320, y=389,
		radius=75,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- cpu temp
		name='hwmon',
		arg='1 temp 2',
		max=75,
		bg_colour=0x3A3A3A,
		bg_alpha=0.70,
		fg_colour=0x989898,
		fg_alpha=0.70,
		x=320, y=389,
		radius=90,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- mb temp
		name='hwmon',
		arg='1 temp 3',
		max=75,
		bg_colour=0x3A3A3A,
		bg_alpha=0.65,
		fg_colour=0x989898,
		fg_alpha=0.65,
		x=320, y=389,
		radius=105,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- CORE 4
		name='cpu',
		arg='cpu4',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.60,
		fg_colour=0x989898,
		fg_alpha=0.60,
		x=320, y=389,
		radius=140,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- CORE 3
		name='cpu',
		arg='cpu3',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.55,
		fg_colour=0x989898,
		fg_alpha=0.55,
		x=320, y=389,
		radius=155,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- CORE 2
		name='cpu',
		arg='cpu2',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.50,
		fg_colour=0x989898,
		fg_alpha=0.50,
		x=320, y=389,
		radius=170,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- CORE 1
		name='cpu',
		arg='cpu1',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.45,
		fg_colour=0x989898,
		fg_alpha=0.45,
		x=320, y=389,
		radius=185,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- CPUFREQ
		name='freq',
		arg='',
		max=3000,
		bg_colour=0x3A3A3A,
		bg_alpha=0.40,
		fg_colour=0x989898,
		fg_alpha=0.40,
		x=320, y=389,
		radius=200,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
	{ -- mem
		name='memperc',
		arg='',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.35,
		fg_colour=0x989898,
		fg_alpha=0.35,
		x=320, y=389,
		radius=235,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- swap
		name='swapperc',
		arg='',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.30,
		fg_colour=0x989898,
		fg_alpha=0.30,
		x=320, y=389,
		radius=250,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
	{ -- home volume
		name='fs_used_perc',
		arg='/home',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.25,
		fg_colour=0x989898,
		fg_alpha=0.25,
		x=320, y=389,
		radius=285,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
    { -- root volume
		name='fs_used_perc',
		arg='/',
		max=100,
		bg_colour=0x3A3A3A,
		bg_alpha=0.2,
		fg_colour=0x989898,
		fg_alpha=0.2,
		x=320, y=389,
		radius=300,
		thickness=10,
		start_angle=270,
		end_angle=360
	},
}

require 'cairo'

function rgb_to_r_g_b(colour,alpha)
	return ((colour / 0x10000) % 0x100) / 255., ((colour / 0x100) % 0x100) / 255., (colour % 0x100) / 255., alpha
end

function draw_ring(cr,t,pt)
	local w,h=conky_window.width,conky_window.height
	
	local xc,yc,ring_r,ring_w,sa,ea=pt['x'],pt['y'],pt['radius'],pt['thickness'],pt['start_angle'],pt['end_angle']
	local bgc, bga, fgc, fga=pt['bg_colour'], pt['bg_alpha'], pt['fg_colour'], pt['fg_alpha']

	local angle_0=sa*(2*math.pi/360)-math.pi/2
	local angle_f=ea*(2*math.pi/360)-math.pi/2
	local t_arc=t*(angle_f-angle_0)

	-- Draw background ring

	cairo_arc(cr,xc,yc,ring_r,angle_0,angle_f)
	cairo_set_source_rgba(cr,rgb_to_r_g_b(bgc,bga))
	cairo_set_line_width(cr,ring_w)
	cairo_stroke(cr)
	
	-- Draw indicator ring

	cairo_arc(cr,xc,yc,ring_r,angle_0,angle_0+t_arc)
	cairo_set_source_rgba(cr,rgb_to_r_g_b(fgc,fga))
	cairo_stroke(cr)		
end

function conky_ring_stats()
	local function setup_rings(cr,pt)
		local str=''
		local value=0
		
		str=string.format('${%s %s}',pt['name'],pt['arg'])
		str=conky_parse(str)
		
		value=tonumber(str)
		if value == nil then value = 0 end
		pct=value/pt['max']
		
		draw_ring(cr,pct,pt)
	end

	if conky_window==nil then return end
	local cs=cairo_xlib_surface_create(conky_window.display,conky_window.drawable,conky_window.visual, conky_window.width,conky_window.height)
	
	local cr=cairo_create(cs)	
	
	local updates=conky_parse('${updates}')
	update_num=tonumber(updates)
	
	if update_num>5 then
		for i in pairs(settings_table) do
			setup_rings(cr,settings_table[i])
		end
	end
end