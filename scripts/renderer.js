class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle(({x: 200, y: 200}), ({x: 400, y: 350}), [255,0,0,255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle(({x: 400, y: 300}), 200, [255,0,0,255], ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve(({x: 200, y: 100}), ({x: 200, y: 400}), ({x: 600, y: 400}), ({x: 600, y: 100}), [255,0,0,255], ctx);
   }

    // ctx:          canvas context
    drawSlide3(ctx) {
        this.drawLine(({x: 200, y: 400}), ({x: 300, y: 400}), [255,0,0,255], ctx);
        this.drawLine(({x: 250, y: 400}), ({x: 250, y: 250}), [255,0,0,255], ctx);
        this.drawBezierCurve(({x: 200, y: 250}), ({x: 200, y: 200}), ({x: 250, y: 200}), ({x: 250, y: 250}), [255,0,0,255], ctx);
        this.drawCircle(({x: 325, y:250}), 50, [255,0,0,255], ctx);
        this.drawLine(({x: 400, y: 210}), ({x: 400, y: 400}), [255,0,0,255], ctx);
        this.drawBezierCurve(({x: 400, y: 210}), ({x: 400, y: 300}), ({x: 450, y: 300}), ({x: 450, y: 210}), [255,0,0,255], ctx);
        this.drawLine(({x: 475, y: 210}), ({x: 475, y: 300}), [255,0,0,255], ctx);
        this.drawBezierCurve(({x: 475, y: 210}), ({x: 475, y: 300}), ({x: 525, y: 300}), ({x: 525, y: 210}), [255,0,0,255], ctx);

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        //console.log(this.show_points_flag);
        this.drawLine(({x: left_bottom.x, y: left_bottom.y}), ({x: left_bottom.x, y: right_top.y}), color, ctx);
        this.drawLine(({x: left_bottom.x, y: right_top.y}), ({x: right_top.x, y: right_top.y}), color, ctx);
        this.drawLine(({x: right_top.x, y: right_top.y}), ({x: right_top.x, y: left_bottom.y}), color, ctx);
        this.drawLine(({x: right_top.x, y: left_bottom.y}), ({x: left_bottom.x, y: left_bottom.y}), color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let xcenter = (center.x);
        //console.log(xcenter);
        let ycenter = (center.y);
        //console.log(ycenter)
        let pi = 3.1415926535;
        let angle = 360/this.num_curve_sections;
        for(let i = 0; i< this.num_curve_sections; i = i+1) {
            let angle1 = angle*i;
            let angle2 = angle*(i+1);
            let x0 = center.x + (radius * Math.cos(angle1 * pi / 180));
            let y0 = center.y + (radius * Math.sin(angle1 * pi / 180));
            let x1 = center.x + (radius * Math.cos(angle2 * pi / 180));
            let y1 = center.y + (radius * Math.sin(angle2 * pi / 180));
            this.drawLine(({x: x0, y: y0}), ({x: x1, y: y1}), color, ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let value = 1/this.num_curve_sections;
        for(let i = 0; i< 1; i=i+value) {
            let t = i;
            let t1 = i+value;
            let x0 = (Math.pow(1-t,3)*(pt0.x)) + (3*Math.pow(1-t,2)*t*(pt1.x)) + (3*(1-t)*Math.pow(t,2)*(pt2.x)) + (Math.pow(t,3)*(pt3.x));
            console.log(x0);
            let y0 = (Math.pow(1-t,3)*(pt0.y)) + (3*Math.pow(1-t,2)*t*(pt1.y)) + (3*(1-t)*Math.pow(t,2)*(pt2.y)) + (Math.pow(t,3)*(pt3.y));
            console.log(y0);
            let x1 = (Math.pow(1-t1,3)*(pt0.x)) + (3*Math.pow(1-t1,2)*t1*(pt1.x)) + (3*(1-t1)*Math.pow(t1,2)*(pt2.x)) + (Math.pow(t1,3)*(pt3.x));
            console.log(x1);
            let y1 = (Math.pow(1-t1,3)*(pt0.y)) + (3*Math.pow(1-t1,2)*t1*(pt1.y)) + (3*(1-t1)*Math.pow(t1,2)*(pt2.y)) + (Math.pow(t1,3)*(pt3.y));
            console.log(y1);
            this.drawLine(({x: x0, y: y0}), ({x: x1, y: y1}), color, ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
    /*
    function pixelIndex(x, y, width) {
        return (width * 4 * y) + (4* x);
    }

    function colorPixel(x, y, color, ctx) {
        let idx =  pixelIndex(x, y, ctx.width);
        ctx.data[idx] = color[0];
        ctx.data[idx + 1) = color[1];
        ctx.data[idx + 2) = color[2];
        ctx.data[idx + 3) = color[3];
    }*/
};
